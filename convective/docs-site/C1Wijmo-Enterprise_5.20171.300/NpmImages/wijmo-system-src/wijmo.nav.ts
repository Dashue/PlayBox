

import * as wjcCore from 'wijmo/wijmo';


import * as wjcSelf from 'wijmo/wijmo.nav';
window['wijmo'] = window['wijmo'] || {};
window['wijmo']['nav'] = wjcSelf;

/*
    *
    * Wijmo Library 5.20171.300
    * http://wijmo.com/
    *
    * Copyright(c) GrapeCity, Inc.  All rights reserved.
    *
    * Licensed under the Wijmo Commercial License.
    * sales@wijmo.com
    * wijmo.com/products/wijmo-5/license/
    *
    */
/**
 * Defines navigation controls including the @see:TreeView and associated classes.
 */


    /**
     * The @see:TreeView control displays a hierarchical list of @see:TreeNode objects
     * which may contain text, checkboxes, images, or arbitrary HTML content.
     *
     * A @see:TreeView is typically used to display the headings in a document,
     * the entries in an index, the files and directories on a disk, or any other
     * kind of information that might usefully be displayed as a hierarchy.
     *
     * After creating a @see:TreeView, you will typically set the following properties:
     *
     * <ol>
     *  <li>
     *      @see:itemsSource: an array that contains the data to be displayed on the
     *      tree.</li>
     *  <li>
     *      @see:displayMemberPath: the name of the data item property that contains
     *      the text to display on the nodes (defaults to 'header'), and</li>
     *  <li>
     *      @see:childItemsPath: the name of the data item property that contains the
     *      node's child items (defaults to 'items').</li>
     * </ol>
     *
     *
     * The example below builds a simple tree and allows you to see the effect
     * of the TreeView's main properties:
     *
     * @fiddle:egmg93wc
     */
    export class TreeView extends wjcCore.Control {
        static _DATAITEM_KEY = 'wj-Data-Item'; // key used to store item reference in node elements
        static _AS_DLY = 600; // auto-search delay
        static _AN_DLY = 200; // animation delay (should match values in CSS)
        static _CND = 'wj-node';
        static _CNDL = 'wj-nodelist';
        static _CEMP = 'wj-state-empty';
        static _CNDT = 'wj-node-text';
        static _CNDC = 'wj-node-check';
        static _CSEL = 'wj-state-selected';
        static _CCLD = 'wj-state-collapsed';
        static _CCLG = 'wj-state-collapsing';
        static _CLDG = 'wj-state-loading';

        // template/parts
        /*private*/ _root: HTMLElement; // accessible to TreeNode

        // property storage
        private _items: any[];
        /*private*/ _selNode: TreeNode; // accessible to TreeNode
        /*private*/ _itmPath = new _BindingArray('items'); // accessible to TreeNode
        private _prevSel: TreeNode;
        private _dspPath = new _BindingArray('header');
        private _imgPath = new _BindingArray();
        private _dd: _TreeDragDropManager;
        private _html = false;
        private _animated = true;
        private _xpndOnClick = true;
        private _autoColl = true;
        private _showChk = false;
        private _chkItems: any[];
        private _ldLvl: number;
        private _srch = '';
        private _toSrch: any;
        private _dnIndet: boolean;
        private _lazyLoad: Function;
        private _isDirty: boolean;
        private _isReadOnly = true;
        private _edtNode: TreeNode;

        /**
         * Gets or sets the template used to instantiate @see:FlexGrid controls.
         */
        static controlTemplate = '<div wj-part="root"></div>'; // node container

        /**
         * Initializes a new instance of the @see:TreeView class.
         *
         * @param element The DOM element that hosts the control, or a selector for the host element (e.g. '#theCtrl').
         * @param options The JavaScript object containing initialization data for the control.
         */
        constructor(element: any, options?) {
            super(element);

            // instantiate and apply template
            var tpl = this.getTemplate();
            this.applyTemplate('wj-control wj-content wj-treeview', tpl, {
                _root: 'root'
            });

            // accessibility: https://www.w3.org/TR/wai-aria-1.1/#tree
            this.hostElement.setAttribute('role', 'tree');

            // configure root as nodeList
            wjcCore.addClass(this._root, TreeView._CNDL);
            this._root.setAttribute('role', 'group');

            // handle mouse and keyboard
            var host = this.hostElement;
            this.addEventListener(host, 'mousedown', this._mousedown.bind(this));
            this.addEventListener(host, 'click', this._click.bind(this));
            this.addEventListener(host, 'keydown', this._keydown.bind(this));
            this.addEventListener(host, 'keypress', this._keypress.bind(this));

            // prevent wheel from propagating to parent elements
            this.addEventListener(host, 'wheel', (e: WheelEvent) => {
                if (host.scrollHeight > host.offsetHeight) {
                    if ((e.deltaY < 0 && host.scrollTop == 0) ||
                        (e.deltaY > 0 && host.scrollTop + host.offsetHeight >= host.scrollHeight)) {
                        e.preventDefault();
                        e.stopPropagation();
                    }
                }
            });

            // finish editing when editor loses focus
            this.addEventListener(host, 'blur', (e) => {
                if (this._edtNode && !wjcCore.contains(this._edtNode.element, wjcCore.getActiveElement())) {
                    this.finishEditing();
                }
            }, true);

            // initialize control options
            this.initialize(options);

            // populate tree right away
            this.refresh();
        }

        //--------------------------------------------------------------------------
        //#region ** object model

        /**
         * Gets or sets the array that contains the @see:TreeView items.
         *
         * @see:TreeView #see:itemsSource arrays usually have a hierarchical
         * structure with items that contain child items. There is no fixed
         * limit to the depth of the items.
         *
         * For example, the array below would generate a tree with three
         * top-level nodes, each with two child nodes:
         *
         * <pre>var tree = new wijmo.input.TreeView('#treeView', {
         *     displayMemberPath: 'header',
         *     childItemsPath: 'items',
         *     itemsSource: [
         *         { header: '1 first', items: [
         *             { header: '1.1 first child' },
         *             { header: '1.2 second child' },
         *         ] },
         *         { header: '2 second', items: [
         *             { header: '3.1 first child' },
         *             { header: '3.2 second child' },
         *         ] },
         *         { header: '3 third', items: [
         *             { header: '3.1 first child' },
         *             { header: '3.2 second child' },
         *         ] }
         *     ]
         * });</pre>
         */
        get itemsSource(): any[] {
            return this._items;
        }
        set itemsSource(value: any[]) {
            if (this._items != value) {
                this._items = wjcCore.asArray(value);
                this.onItemsSourceChanged();
                this._reload();
            }
        }
        /**
         * Gets or sets the name of the property (or properties) that contains
         * the child items for each node.
         *
         * The default value for this property is the string 'items'.
         *
         * In most cases, the property that contains the child items is the
         * same for all data items on the tree. In these cases, set the
         * @see:childItemsPath to that name.
         *
         * In some cases, however, items at different levels use different
         * properties to store their child items. For example, you could have
         * a tree with categories, products, and orders. In that case, you
         * would set the @see:childItemsPath to an array such as this:
         *
         * <pre>// categories have products, products have orders:
         * tree.childItemsPath = [ 'Products', 'Orders' ];</pre>
         */
        get childItemsPath(): any {
            return this._itmPath.path;
        }
        set childItemsPath(value: any) {
            if (value != this.childItemsPath) {
                this._itmPath.path = value;
                this._reload();
            }
        }
        /**
         * Gets or sets the name of the property (or properties) to use as
         * the visual representation of the nodes.
         *
         * The default value for this property is the string 'header'.
         *
         * In most cases, the property that contains the node text is the
         * same for all data items on the tree. In these cases, set the
         * @see:displayMemberPath to that name.
         *
         * In some cases, however, items at different levels use different
         * properties to represent them. For example, you could have
         * a tree with categories, products, and orders. In that case, you
         * might set the @see:displayMemberPath to an array such as this:
         *
         * <pre>// categories, products, and orders have different headers:
         * tree.displayMemberPath = [ 'CategoryName', 'ProductName', 'OrderID' ];</pre>
         */
        get displayMemberPath(): any {
            return this._dspPath.path;
        }
        set displayMemberPath(value: any) {
            if (value != this.displayMemberPath) {
                this._dspPath.path = value;
                this._reload();
            }
        }
        /**
         * Gets or sets the name of the property (or properties) to use as a
         * source of images for the nodes.
         */
        get imageMemberPath(): any {
            return this._imgPath.path;
        }
        set imageMemberPath(value: any) {
            if (value != this.imageMemberPath) {
                this._imgPath.path = value;
                this._reload();
            }
        }
        /**
         * Gets or sets a value indicating whether items are bound to plain text or HTML.
         */
        get isContentHtml(): boolean {
            return this._html;
        }
        set isContentHtml(value: boolean) {
            if (value != this._html) {
                this._html = wjcCore.asBoolean(value);
                this._reload();
            }
        }
        /**
         * Gets or sets a value that determines whether the @see:TreeView should
         * add checkboxes to nodes and manage their state.
         *
         * This property can be used only on trees without lazy-loaded nodes
         * (see the @see:lazyLoadFunction property).
         *
         * See also the @see:checkedItems property and @see:checkedItemsChanged
         * event.
         */
        get showCheckboxes(): boolean {
            return this._showChk;
        }
        set showCheckboxes(value: boolean) {
            if (value != this._showChk) {
                this._showChk = wjcCore.asBoolean(value);
                this._reload();
            }
        }
        /**
         * Gets or sets a value that determines if sibling nodes should be collapsed
         * when a node is expanded.
         *
         * This property is set to true by default, because in most cases collapsing
         * nodes that are not in use helps keep the UI clearer.
         */
        get autoCollapse(): boolean {
            return this._autoColl;
        }
        set autoCollapse(value: boolean) {
            this._autoColl = wjcCore.asBoolean(value);
        }
        /**
         * Gets or sets a value that indicates whether to use animations when expanding
         * or collapsing nodes.
         */
        get isAnimated(): boolean {
            return this._animated;
        }
        set isAnimated(value: boolean) {
            if (value != this._animated) {
                this._animated = wjcCore.asBoolean(value);
            }
        }
        /**
         * Gets or sets a value that determines whether users can edit the text in the
         * nodes.
         *
         * When the @see:isReadOnly property is set to false, users may edit the content
         * of the tree nodes by typing directly into the nodes. The F2 key can also
         * be used to enter edit mode with the whole node content selected.
         *
         * You may customize the editing behavior using the following methods and events:
         *
         * Methods: @see:startEditing, @see:finishEditing.
         *
         * Events: @see:nodeEditStarting, @see:nodeEditStarted, @see:nodeEditEnding,
         * @see:nodeEditEnded.
         */
        get isReadOnly(): boolean {
            return this._isReadOnly;
        }
        set isReadOnly(value: boolean) {
            this._isReadOnly = wjcCore.asBoolean(value);
        }
        /**
         * Starts editing a given @see:TreeNode.
         *
         * @param node @see:TreeNode to edit. If not provided, the currently
         * selected node is used.
         * 
         * @return True if the edit operation started successfully.
         */
        startEditing(node?: TreeNode): boolean {

            // not in read-only mode
            if (this.isReadOnly) {
                return false;
            }

            // get node to edit
            if (!node) {
                node = this.selectedNode;
            }
            if (!node || node.isDisabled) { // TFS 250004
                return false;
            }

            // finish pending edits
            if (!this.finishEditing()) {
                return false;
            }

            // get editor element
            var editor = node.element.querySelector('.' + TreeView._CNDT);
            if (!editor) {
                return false;
            }

            // starting
            var e = new TreeNodeEventArgs(node);
            if (!this.onNodeEditStarting(e)) {
                return false;
            }

            // make content editable and selected
            editor.tabIndex = 0; // important for Chrome (TFS 239219)
            editor.focus();
            editor.contentEditable = 'true';
            editor.style.cursor = 'auto';
            var rng = document.createRange();
            rng.selectNodeContents(editor);
            var sel = getSelection();
            sel.removeAllRanges();
            sel.addRange(rng);
            editor.focus(); // important for FireFox (TFS 237528)

            // turn autocomplete/correct off (TFS 238164)
            // http://stackoverflow.com/questions/21163002/disable-autocorrect-autocompletion-in-content-editable-div
            wjcCore.setAttribute(editor, 'autocomplete', 'off');
            wjcCore.setAttribute(editor, 'autocorrect', 'off');

            // we are in edit mode
            this._edtNode = node;
            this.onNodeEditStarted(e);
            return true;
        }
        /**
         * Commits any pending edits and exits edit mode.
         *
         * @param cancel Whether pending edits should be canceled or committed.
         * @return True if the edit operation finished successfully.
         */
        finishEditing(cancel?: boolean): boolean {
            var node = this._edtNode;
            if (node) {

                // get editor element
                var editor = node.element.querySelector('.' + TreeView._CNDT);
                if (!editor) {
                    return false;
                }

                // ending
                var e = new TreeNodeEventArgs(node);
                if (!this.onNodeEditEnding(e)) {
                    return false;
                }

                // persist/restore value
                var item = node.dataItem,
                    level = node.level;
                if (this.isContentHtml) {
                    if (cancel) {
                        editor.innerHTML = this._dspPath.getValue(item, level);
                    } else {
                        this._dspPath.setValue(item, level, editor.innerHTML);
                    }
                } else {
                    if (cancel) {
                        editor.textContent = this._dspPath.getValue(item, level);
                    } else {
                        this._dspPath.setValue(item, level, editor.textContent);
                    }
                }

                // remove selection
                var rng = document.createRange();
                rng.selectNodeContents(editor);
                var sel = getSelection();
                sel.removeAllRanges();

                // done editing
                editor.contentEditable = 'false';
                editor.style.cursor = '';
                this._edtNode = null;

                // ended
                this.onNodeEditEnded(e);
            }
            return true;
        }
        /**
         * Gets or sets a value that determines whether users can drag and drop nodes
         * within the @see:TreeView.
         */
        get allowDragging(): boolean {
            return this._dd != null;
        }
        set allowDragging(value: boolean) {
            if (value != this.allowDragging) {

                // create/dispose of the _TreeViewDragDropManager
                if (wjcCore.asBoolean(value)) {
                    this._dd = new _TreeDragDropManager(this);
                } else {
                    this._dd.dispose();
                    this._dd = null;
                }

                // add/remove draggable attribute on node elements
                var nodes = this.hostElement.querySelectorAll('.' + TreeView._CND);
                for (var i = 0; i < nodes.length; i++) {
                    var node = nodes[i];
                    wjcCore.setAttribute(node, 'draggable', this._dd ? true : null);
                }
            }
        }
        /**
         * Gets or sets a value that determines whether to expand collapsed nodes when
         * the user clicks the node header.
         */
        get expandOnClick(): boolean {
            return this._xpndOnClick;
        }
        set expandOnClick(value: boolean) {
            this._xpndOnClick = wjcCore.asBoolean(value);
        }
        /**
         * Gets or sets the data item that is currently selected.
         */
        get selectedItem(): any {
            return this._selNode ? this._selNode.dataItem : null;
        }
        set selectedItem(value: any) {
            if (value != this.selectedItem) {
                this.selectedNode = value ? this.getNode(value) : null;
            }
        }
        /**
         * Gets or sets the @see:TreeNode that is currently selected.
         */
        get selectedNode(): TreeNode {
            return this._selNode;
        }
        set selectedNode(value: TreeNode) {
            if (value != this.selectedNode) {
                this._prevSel = this._selNode;
                if (value) {
                    value.select();
                } else if (this._selNode) {
                    wjcCore.removeClass(this._selNode.element, TreeView._CSEL);
                    this._selNode = null;
                    this.onSelectedItemChanged();
                }
            }
        }
        /**
         * Gets an array containing the text of all nodes from the root
         * to the currently selected node.
         */
        get selectedPath(): string[] {
            var path = [];
            for (var nd = this.selectedNode; nd; nd = nd.parentNode) {
                var text = this._dspPath.getValue(nd.dataItem, nd.level);
                path.splice(0, 0, text);
            }
            return path;
        }
        /**
         * Gets an array containing the items that are currently checked.
         *
         * The array returned includes only items that have no children.
         * This is because checkboxes in parent items are used to check
         * or uncheck the child items.
         *
         * See also the @see:showCheckboxes property and the
         * @see:checkedItemsChanged property.
         *
         * For example:
         *
         * <pre>var treeViewChk = new wijmo.input.TreeView('#gsTreeViewChk', {
         *    displayMemberPath: 'header',
         *    childItemsPath: 'items',
         *    showCheckboxes: true,
         *    itemsSource: items,
         *    checkedItemsChanged: function (s, e) {
         *        var items = s.checkedItems,
         *            msg = '';
         *        if (items.length) {
         *            msg = '&lt;p&gt;&lt;b&gt;Selected Items:&lt;/b&gt;&lt;/p&gt;&lt;ol&gt;\r\n';
         *            for (var i = 0; i &lt; items.length; i++) {
         *                msg += '&lt;li&gt;' + items[i].header + '&lt;/li&gt;\r\n';
         *            }
         *            msg += '&lt;/ol&gt;';
         *        }
         *        document.getElementById('gsTreeViewChkStatus').innerHTML = msg;
         *    }
         * });</pre>
         */
        get checkedItems(): any[] {
            if (this._chkItems == null) {
                var tv = TreeView,
                    qry = '.' + tv._CND + '.' + tv._CEMP + ' > input:checked.' + tv._CNDC,
                    chk = this._root.querySelectorAll(qry);
                this._chkItems = [];
                for (var i = 0; i < chk.length; i++) {
                    var item = chk[i].parentElement[tv._DATAITEM_KEY];
                    this._chkItems.push(item);
                }
            }
            return this._chkItems;
        }
        set checkedItems(value: any[]) {
            if (this.showCheckboxes) {
                var tv = TreeView,
                    qry = '.' + tv._CND + '.' + tv._CEMP,
                    chk = this._root.querySelectorAll(qry),
                    changed = false;
                for (var i = 0; i < chk.length; i++) {
                    var node = new TreeNode(this, <HTMLElement>chk[i]),
                        checked = value.indexOf(node.dataItem) > -1;
                    if (node.isChecked != checked) {
                        node.isChecked = checked;
                        changed = true;
                    }
                }
                if (changed) {
                    this.onCheckedItemsChanged();
                }
            }
        }
        /**
         * Checks or unchecks all checkboxes on the tree.
         *
         * @param check Whether to check or unckeck all checkboxes.
         */
        checkAllItems(check: boolean) {
            if (this.showCheckboxes) {
                var tv = TreeView,
                    qry = '.' + tv._CND + '.' + tv._CEMP,
                    chk = this._root.querySelectorAll(qry),
                    changed = false;
                for (var i = 0; i < chk.length; i++) {
                    var node = new TreeNode(this, <HTMLElement>chk[i]);
                    if (node.isChecked != check) {
                        node.isChecked = check;
                        changed = true;
                    }
                }
                if (changed) {
                    this.onCheckedItemsChanged();
                }
            }
        }
        /**
         * Gets the total number of items in the tree.
         */
        get totalItemCount(): number {
            var nodes = this.hostElement.querySelectorAll('.' + TreeView._CND);
            return nodes.length;
        }
        /**
         * Gets or sets a function that loads child nodes on demand.
         *
         * The @see:lazyLoadFunction takes two parameters: the node being
         * expanded and a callback to be invoked when the data becomes
         * available.
         *
         * The callback function tells the @see:TreeView that the node
         * loading process has been completed. It should always be called,
         * even if there are errors when loading the data.
         *
         * For example:
         *
         *<pre>var treeViewLazyLoad = new wijmo.input.TreeView('#treeViewLazyLoad', {
         *    displayMemberPath: 'header',
         *    childItemsPath: 'items',
         *    itemsSource: [ // start with three lazy-loaded nodes
         *        { header: 'Lazy Node 1', items: []},
         *        { header: 'Lazy Node 2', items: [] },
         *        { header: 'Lazy Node 3', items: [] }
         *    ],
         *    lazyLoadFunction: function (node, callback) {
         *        setTimeout(function () { // simulate http delay
         *            var result = [ // simulate result
         *                { header: 'Another lazy node...', items: [] },
         *                { header: 'A non-lazy node without children' },
         *                { header: 'A non-lazy node with child nodes', items: [
         *                  { header: 'hello' },
         *                  { header: 'world' }
         *                ]}
         *            ];
         *            callback(result); // return result to control
         *        }, 2500); // simulated 2.5 sec http delay
         *    }
         *});</pre>
         *
         * Trees with lazy-loaded nodes have some restrictions: their nodes
         * may not have checkboxes (see the @see:showCheckboxes property) and
         * the @see:collapseToLevel method will not expand collapsed nodes
         * that have not been loaded yet.
         */
        get lazyLoadFunction(): Function {
            return this._lazyLoad;
        }
        set lazyLoadFunction(value: Function) {
            if (value != this._lazyLoad) {
                this._lazyLoad = wjcCore.asFunction(value);
                this._reload();
            }
        }
        /**
         * Gets a reference to the first @see:TreeNode in the @see:TreeView.
         *
         * @param visible Whether to return only visible nodes (whose ancestors are not collapsed).
         * @param enabled Whether to return only enabled nodes (whose ancestors are not disabled).
         */
        getFirstNode(visible?: boolean, enabled?: boolean): TreeNode {
            var first = <HTMLElement>this.hostElement.querySelector('.' + TreeView._CND),
                node = first ? new TreeNode(this, first) : null;
            if (visible && node && !node.element.offsetHeight) {
                node = node.next(visible, enabled);
            }
            if (enabled && node && node.isDisabled) {
                node = node.next(visible, enabled);
            }
            return node;
        }
        /**
         * Gets a reference to the last @see:TreeNode in the @see:TreeView.
         *
         * @param visible Whether to return only visible nodes (whose ancestors are not collapsed).
         * @param enabled Whether to return only enabled nodes (whose ancestors are not disabled).
         */
        getLastNode(visible?: boolean, enabled?: boolean): TreeNode {
            var last = this.hostElement.querySelectorAll('.' + TreeView._CND + ':last-child'),
                node = last.length ? new TreeNode(this, <HTMLElement>last[last.length - 1]) : null;
            if (visible && node && !node.element.offsetHeight) {
                node = node.previous(visible, enabled);
            }
            if (enabled && node && node.isDisabled) {
                node = node.previous(visible, enabled);
            }
            return node;
        }
        /**
         * Gets an array of @see:TreeNode objects representing the nodes
         * currently loaded.
         */
        get nodes(): TreeNode[] {
            return TreeNode._getChildNodes(this, this._root);
        }
        /**
         * Gets the @see:TreeNode object representing a given data item.
         *
         * @param item The data item to look for.
         */
        getNode(item: any): TreeNode {
            var nodes = this.hostElement.querySelectorAll('.' + TreeView._CND);
            for (var i = 0; i < nodes.length; i++) {
                var node = <HTMLElement>nodes[i];
                if (node[TreeView._DATAITEM_KEY] == item) {
                    return new TreeNode(this, node);
                }
            }
            return null;
        }
        /**
         * Collapses all the tree items to a given level.
         *
         * This method will typically expand or collapse multiple nodes
         * at once. But it will not perform lazy-loading on any nodes,
         * so collapsed nodes that must be lazy-loaded will not be
         * expanded.
         *
         * @param level Maximum node level to show.
         */
        collapseToLevel(level: number) {

            // suspend animation/autoCollapse
            var animated = this._animated;
            var autoColl = this._autoColl;
            this._animated = this._autoColl = false;

            // collapse to level
            this._collapseToLevel(this.nodes, level, 0);

            // restore animation/autoCollapse
            this._animated = animated;
            this._autoColl = autoColl;
        }

        /**
         * Occurs when the value of the @see:itemsSource property changes.
         */
        itemsSourceChanged = new wjcCore.Event();
        /**
         * Raises the @see:itemsSourceChanged event.
         */
        onItemsSourceChanged(e?: wjcCore.EventArgs) {
            this.itemsSourceChanged.raise(this, e);
        }
        /**
         * Occurs before the tree items are generated.
         */
        loadingItems = new wjcCore.Event();
        /**
         * Raises the @see:loadingItems event.
         */
        onLoadingItems(e?: wjcCore.EventArgs) {
            this.loadingItems.raise(this, e);
        }
        /**
         * Occurs after the tree items have been generated.
         */
        loadedItems = new wjcCore.Event();
        /**
         * Raises the @see:loadedItems event.
         */
        onLoadedItems(e?: wjcCore.EventArgs) {
            this.loadedItems.raise(this, e);
        }
        /**
         * Occurs when the user clicks an item or presses the Enter key and an item is selected.
         *
         * This event is typically used in navigation trees. Use the @see:selectedItem property
         * to get the item that was clicked.
         */
        itemClicked = new wjcCore.Event();
        /**
         * Raises the @see:itemClicked event.
         */
        onItemClicked(e?: wjcCore.EventArgs) {
            this.itemClicked.raise(this, e);
        }
        /**
         * Occurs when the value of the @see:selectedItem property changes.
         */
        selectedItemChanged = new wjcCore.Event();
        /**
         * Raises the @see:selectedItemChanged event.
         */
        onSelectedItemChanged(e?: wjcCore.EventArgs) {
            this.selectedItemChanged.raise(this, e)
        }
        /**
         * Occurs when the value of the @see:checkedItems property changes.
         */
        checkedItemsChanged = new wjcCore.Event();
        /**
         * Raises the @see:checkedItemsChanged event.
         */
        onCheckedItemsChanged(e?: wjcCore.EventArgs) {
            this._chkItems = null;
            this.checkedItemsChanged.raise(this, e);
        }
        /**
         * Occurs before the value of the @see:TreeNode.isCollapsed property changes.
         */
        isCollapsedChanging = new wjcCore.Event();
        /**
         * Raises the @see:isCollapsedChanging event.
         *
         * @param e @see:TreeNodeEventArgs that contains the event data.
         * @return True if the event was not canceled.
         */
        onIsCollapsedChanging(e: TreeNodeEventArgs): boolean {
            this.isCollapsedChanging.raise(this, e);
            return !e.cancel;
        }
        /**
         * Occurs after the value of the @see:TreeNode.isCollapsed property changes.
         */
        isCollapsedChanged = new wjcCore.Event();
        /**
         * Raises the @see:isCollapsedChanged event.
         *
         * @param e @see:TreeNodeEventArgs that contains the event data.
         */
        onIsCollapsedChanged(e: TreeNodeEventArgs) {
            this.isCollapsedChanged.raise(this, e);
        }
        /**
         * Occurs before the value of the @see:TreeNode.isChecked property changes.
         */
        isCheckedChanging = new wjcCore.Event();
        /**
         * Raises the @see:isCheckedChanging event.
         *
         * @param e @see:TreeNodeEventArgs that contains the event data.
         * @return True if the event was not canceled.
         */
        onIsCheckedChanging(e: TreeNodeEventArgs): boolean {
            this.isCheckedChanging.raise(this, e);
            return !e.cancel;
        }
        /**
         * Occurs after the value of the @see:TreeNode.isChecked property changes.
         */
        isCheckedChanged = new wjcCore.Event();
        /**
         * Raises the @see:isCheckedChanged event.
         *
         * @param e @see:TreeNodeEventArgs that contains the event data.
         */
        onIsCheckedChanged(e: TreeNodeEventArgs) {
            this.isCheckedChanged.raise(this, e);
        }
        /**
         * Occurs when an element representing a node has been created.
         *
         * This event can be used to format nodes for display.
         *
         * The example below uses the <b>formatItem</b> event to add a "new" badge to the
         * right of new items on the tree.
         *
         * <pre>var treeViewFmtItem = new wijmo.input.TreeView('#treeViewFmtItem', {
         *     displayMemberPath: 'header',
         *     childItemsPath: 'items',
         *     itemsSource: items,
         *     formatItem: function (s, e) {
         *         if (e.dataItem.newItem) {
         *             e.element.innerHTML +=
         *                 '&lt;img style="margin-left:6px" src="resources/new.png"/&gt;';
         *         }
         *     }
         * });</pre>
         */
        formatItem = new wjcCore.Event();
        /**
         * Raises the @see:formatItem event.
         *
         * @param e @see:FormatNodeEventArgs that contains the event data.
         */
        onFormatItem(e: FormatNodeEventArgs) {
            this.formatItem.raise(this, e);
        }

        // drag/drop events

        /**
         * Occurs when the user starts dragging a node.
         *
         * This event only occurs if the @see:allowDragging property is set to true.
         *
         * You may prevent nodes from being dragged by setting the event's
         * <b>cancel</b> parameter to true.
         */
        dragStart = new wjcCore.Event();
        /**
         * Raises the @see:dragStart event.
         *
         * @param e @see:TreeNodeEventArgs that contains the event data.
         * @return True if the event was not canceled.
         */
        onDragStart(e: TreeNodeEventArgs): boolean {
            this.dragStart.raise(this, e);
            return !e.cancel;
        }
        /**
         * Occurs while the user drags a node over other nodes on the @see:TreeView.
         *
         * This event only occurs if the @see:allowDragging property is set to true.
         *
         * You may prevent drop operations over certain nodes and/or positions by
         * setting the event's <b>cancel</b> parameter to true.
         */
        dragOver = new wjcCore.Event();
        /**
         * Raises the @see:dragOver event.
         *
         * @param e @see:TreeNodeDragDropEventArgs that contains the event data.
         * @return True if the event was not canceled.
         */
        onDragOver(e: TreeNodeDragDropEventArgs): boolean {
            this.dragOver.raise(this, e);
            return !e.cancel;
        }
        /**
         * Occurs when the user drops a on the @see:TreeView.
         * @return True if the event was not canceled.
         */
        drop = new wjcCore.Event();
        /**
         * Raises the @see:drop event.
         *
         * @param e @see:TreeNodeDragDropEventArgs that contains the event data.
         */
        onDrop(e: TreeNodeDragDropEventArgs): boolean {
            this.drop.raise(this, e);
            return !e.cancel;
        }
        /**
         * Occurs when the user finishes a drag/drop operation, either by dropping
         * a node into a new location or by canceling the operation with the mouse
         * or keyboard.
         */
        dragEnd = new wjcCore.Event();
        /**
         * Raises the @see:dragEnd event.
         */
        onDragEnd(e?: wjcCore.EventArgs) {
            this.dragEnd.raise(this, e);
        }

        // editing events

        /**
         * Occurs before a @see:TreeNode enters edit mode.
         */
        nodeEditStarting = new wjcCore.Event();
        /**
         * Raises the @see:nodeEditStarting event.
         *
         * @param e @see:TreeNodeEventArgs that contains the event data.
         * @return True if the event was not canceled.
        */
        onNodeEditStarting(e: TreeNodeEventArgs): boolean {
            this.nodeEditStarting.raise(this, e);
            return !e.cancel;
        }
        /**
         * Occurs after a @see:TreeNode has entered edit mode.
         */
        nodeEditStarted = new wjcCore.Event();
        /**
         * Raises the @see:nodeEditStarted event.
         *
         * @param e @see:TreeNodeEventArgs that contains the event data.
         */
        onNodeEditStarted(e: TreeNodeEventArgs) {
            this.nodeEditStarted.raise(this, e);
        }
        /**
         * Occurs before a @see:TreeNode exits edit mode.
         */
        nodeEditEnding = new wjcCore.Event();
        /**
         * Raises the @see:nodeEditEnding event.
         *
         * @param e @see:TreeNodeEventArgs that contains the event data.
         * @return True if the event was not canceled.
         */
        onNodeEditEnding(e: TreeNodeEventArgs): boolean {
            this.nodeEditEnding.raise(this, e);
            return !e.cancel;
        }
        /**
         * Occurs after a @see:TreeNode has exited edit mode.
         */
        nodeEditEnded = new wjcCore.Event();
        /**
        * Raises the @see:nodeEditEnded event.
        *
        * @param e @see:TreeNodeEventArgs that contains the event data.
        */
        onNodeEditEnded(e: TreeNodeEventArgs) {
            this.nodeEditEnded.raise(this, e);
        }

        //--------------------------------------------------------------------------
        //#region ** overrides

        /**
         * Overridden to re-populate the tree.
         */
        refresh() {
            super.refresh();
            if (!this.isUpdating && this._isDirty) {
                this._populateTree();
            }
        }

        //--------------------------------------------------------------------------
        //#region ** private stuff

        // mark as dirty to reload data on the next refresh
        _reload() {
            this._isDirty = true;
            this.invalidate();
        }

        // select on mouse down
        private _mousedown(e: MouseEvent) {
            if (!e.defaultPrevented) {
                var cb = <HTMLInputElement>wjcCore.closest(e.target, 'input.' + TreeView._CNDC),
                    ne = <HTMLElement>wjcCore.closest(e.target, '.' + TreeView._CND),
                    node = ne ? new TreeNode(this, ne) : null;

                // select clicked item
                if (node && !node.isDisabled) {
                    this.selectedNode = node;
                }

                // workaround for IE bug: https://github.com/jquery/jquery/issues/1698
                this._dnIndet = cb && cb.indeterminate;
            }
        }

        // click to toggle node collapsed state
        private _click(e: MouseEvent) {
            if (!e.defaultPrevented) {
                var nodeElement = <HTMLElement>wjcCore.closest(e.target, '.' + TreeView._CND);
                if (nodeElement) {
                    var node = new TreeNode(this, nodeElement),
                        cb = <HTMLInputElement>wjcCore.closest(e.target, 'input.' + TreeView._CNDC);

                    // ignore clicks on disabled nodes
                    if (node.isDisabled) {
                        return;
                    }

                    // ignore clicks on nodes being edited
                    if (!cb && node.equals(this._edtNode)) {
                        return;
                    }

                    // get the focus
                    nodeElement.focus();

                    // toggle isChecked
                    if (cb) {

                        // prevent checkbox from handling the click
                        e.preventDefault();
                        e.stopPropagation();

                        // make sure checkbox is updated and raise checkedItemsChanged
                        setTimeout(() => {
                            cb.indeterminate = false; // this is required in Chrome/FF: TFS 237264
                            node.isChecked = !node.isChecked;
                            this.onCheckedItemsChanged();
                        })
                    }

                    // toggle isCollapsed or start editing
                    if (!cb) {

                        // toggle isCollapsed
                        var el = <HTMLElement>e.target,
                            ctrlKey = e.ctrlKey || e.metaKey,
                            collToLevel = ctrlKey && !node.hasPendingChildren,
                            rc = nodeElement.getBoundingClientRect(),
                            offset = this.rightToLeft ? rc.right - e.clientX : e.clientX - rc.left,
                            toggled = false;
                        if (offset <= el.offsetHeight) {
                            if (collToLevel) {
                                this.collapseToLevel(node.isCollapsed ? node.level + 1 : node.level);
                            } else {
                                node.isCollapsed = !node.isCollapsed;
                            }
                            toggled = true;
                        } else if (this.expandOnClick && node.isCollapsed) {
                            if (collToLevel) {
                                this.collapseToLevel(node.level);
                            } else {
                                node.isCollapsed = false;
                            }
                            toggled = true;
                        }

                        // make sure the selected node is visible after big expand/collapse
                        if (toggled && collToLevel && this.selectedNode) {
                            this.selectedNode.ensureVisible();
                        }

                        // start editing if we didn't toggle and the selection didn't change
                        if (!toggled && !this.isReadOnly) {
                            if (this.selectedNode && this.selectedNode.equals(this._prevSel)) {
                                this.startEditing();
                            }
                        }
                    }

                    // raise itemClicked (for navigation)
                    if (this.selectedItem) {
                        this.onItemClicked();
                    }
                }
            }
        }

        // handle keydown (cursor keys)
        private _keydown(e: KeyboardEvent) {
            if (!e.defaultPrevented) {
                var node = this._selNode,
                    newNode: TreeNode,
                    key = e.keyCode,
                    handled = true;
                if (node && !node.isDisabled) {

                    // enter/exit editmode
                    switch (key) {
                        case wjcCore.Key.F2:
                            this.startEditing();
                            e.preventDefault();
                            break;
                        case wjcCore.Key.Escape:
                            this.finishEditing(true);
                            e.preventDefault();
                            break;
                        case wjcCore.Key.Up:
                        case wjcCore.Key.Down:
                            this.finishEditing();
                            break;
                        case wjcCore.Key.Enter:
                            if (this._edtNode) {
                                this.finishEditing();
                                key = wjcCore.Key.Down;
                            } else {
                                this.startEditing()
                                e.preventDefault();
                            }
                            break;
                    }

                    // ignore other keys in editing mode
                    if (this._edtNode) {
                        return; 
                    }

                    // switch left/right keys in RTL mode
                    if (this.rightToLeft) {
                        switch (key) {
                            case wjcCore.Key.Left:
                                key = wjcCore.Key.Right;
                                break;
                            case wjcCore.Key.Right:
                                key = wjcCore.Key.Left;
                                break;
                        }
                    }

                    // handle key
                    switch (key) {

                        // collapse expanded nodes, select parent of collapsed/empty nodes
                        case wjcCore.Key.Left:
                            if (!node.isCollapsed && node.hasChildren) {
                                node.setCollapsed(true);
                            } else {
                                node = node.parentNode;
                                if (node) {
                                    node.select();
                                }
                            }
                            break;

                        // expand collapsed nodes
                        case wjcCore.Key.Right:
                            node.setCollapsed(false);
                            break;

                        // select previous/next
                        case wjcCore.Key.Up:
                            newNode = node.previous(true, true);
                            break;
                        case wjcCore.Key.Down:
                            newNode = node.next(true, true);
                            break;
                        case wjcCore.Key.Home:
                            newNode = this.getFirstNode(true, true);
                            break;
                        case wjcCore.Key.End:
                            newNode = this.getLastNode(true, true);
                            break;

                        // toggle checkbox on space
                        case wjcCore.Key.Space:
                            if (this.selectedItem) {
                                var cb = node.checkBox;
                                if (cb) {
                                    node.isChecked = !cb.checked;
                                    this.onCheckedItemsChanged();
                                }
                            }
                            break;

                        // raise itemClicked on Enter
                        case wjcCore.Key.Enter:
                            if (this.selectedItem) {
                                this.onItemClicked();
                            }
                            break;

                        // allow default handling
                        default:
                            handled = false;
                    }
                    if (handled) {

                        // ignore event
                        e.preventDefault();

                        // update selection
                        if (newNode) {
                            newNode.select();
                        }
                    }
                }
            }
        }

        // handle keypress (select/search)
        private _keypress(e: KeyboardEvent) {
            if (!e.defaultPrevented) {

                // don't interfere with inner input elements (TFS 132081)
                if (e.target instanceof HTMLInputElement) return;
                if (this._edtNode) return;

                // start editing?
                if (e.charCode > 32 && this.startEditing(this.selectedNode)) {

                    // apply the character (needed in Firefox only: TFS 238554)
                    var edt = wjcCore.getActiveElement();
                    if (wjcCore.contains(this._edtNode.element, edt)) {

                        // apply new text and eat event
                        edt.textContent = String.fromCharCode(e.charCode);
                        e.preventDefault();

                        // move the cursor to the end of the new text
                        var rng = document.createRange();
                        rng.selectNodeContents(edt);
                        rng.collapse(false);
                        var sel = getSelection();
                        sel.removeAllRanges();
                        sel.addRange(rng);
                    }

                    // done here
                    return;
                }

                // auto search
                if (e.charCode > 32 || (e.charCode == 32 && this._srch)) {
                    e.preventDefault();

                    // update search string
                    this._srch += String.fromCharCode(e.charCode).toLowerCase();
                    if (this._toSrch) {
                        clearTimeout(this._toSrch);
                    }
                    this._toSrch = setTimeout(() => {
                        this._toSrch = null;
                        this._srch = '';
                    }, TreeView._AS_DLY);

                    // perform search
                    var item = this._findNext(); // multi-char search
                    if (item == null && this._srch.length > 1) {
                        this._srch = this._srch[this._srch.length - 1];
                        item = this._findNext(); // single-char search
                    }
                    if (item != null) {
                        this.selectedItem = item;
                    }
                }
            }
        }

        // look for the '_search' string from the current position
        private _findNext(): any {
            if (this.hostElement && this.selectedItem) {
                var start = this.getNode(this.selectedItem),
                    node = start,
                    wrapped = false,
                    skip = false;

                // start searching from current or next item
                if (this._srch.length == 1) {
                    skip = true; // TFS 250005
                }

                // search through the items (with wrapping)
                for (; node;) {

                    // check this node
                    if (!node.isDisabled && !skip) {
                        var txt = node.element.textContent.trim().toLowerCase();
                        if (txt.indexOf(this._srch) == 0) {
                            return node.dataItem;
                        }
                    }

                    // move on to next visible node
                    var next = node.next(true, true);
                    if (next == start && wrapped) {
                        break;
                    }
                    if (!next && !wrapped) {
                        next = this.getFirstNode(true, true);
                        wrapped = true;
                    }
                    node = next;
                    skip = false;
                }
            }

            // not found
            return null;
        }

        // fill up the tree with node elements
        private _populateTree() {
            var root = this._root;
            if (root) {

                // we're not dirty anymore
                this._isDirty = false;

                // remember if we have focus
                var focus = this.containsFocus();

                // remember selected item
                var sel = this.selectedItem;
                this.selectedItem = null;

                // clear checkeditems array
                this._chkItems = null;

                // fire event so user can clean up any current items
                this._ldLvl = -1;
                this.onLoadingItems();

                // populate the tree
                root.innerHTML = '';
                if (this._items) {
                    for (var i = 0; i < this._items.length; i++) {
                        this._addItem(root, 0, this._items[i]);
                    }
                }

                // restore focus
                if (focus && !this.containsFocus()) {
                    this.focus();
                }

                // try restoring the selection
                this.selectedItem = sel;

                // fire event so user can customize items as needed
                this.onLoadedItems();
                this._ldLvl = -1;
            }
        }

        // adds an item to the list
        private _addItem(host: HTMLElement, level: number, item: any) {

            // get node data
            var text = this._dspPath.getValue(item, level),
                imgSrc = this._imgPath.getValue(item, level),
                arr = wjcCore.asArray(this._itmPath.getValue(item, level), true);

            // create the node
            var node = document.createElement('div');
            wjcCore.addClass(node, TreeView._CND);
            node.tabIndex = 0;

            // accessibility: https://www.w3.org/TR/wai-aria-1.1/#tree
            node.setAttribute('role', 'treeitem');

            // set text
            var span = document.createElement('span');
            if (this.isContentHtml) {
                span.innerHTML = text;
            } else {
                span.textContent = text;
            }
            wjcCore.addClass(span, TreeView._CNDT);
            node.appendChild(span);

            // add image
            if (imgSrc) {
                var img = document.createElement('img');
                img.src = imgSrc;
                node.insertBefore(img, node.firstChild);
            }

            // add checkbox
            if (this._showChk && !this._lazyLoad) {
                var cb = document.createElement('input');
                cb.type = 'checkbox';
                cb.tabIndex = -1;
                wjcCore.addClass(cb, TreeView._CNDC);
                node.insertBefore(cb, node.firstChild);
            }

            // add draggable attribute
            if (this._dd) {
                node.setAttribute('draggable', 'true');
            }

            // add node to host
            host.appendChild(node);

            // store reference to item in the node element
            node[TreeView._DATAITEM_KEY] = item;

            // an array with no elements is like no array
            if (arr && arr.length == 0 && !this.lazyLoadFunction) {
                arr = null;
            }

            // load child nodes
            if (arr) {

                // set collapsed state
                var expanded = true;
                if (level > this._ldLvl) {
                    this._ldLvl = level;

                    // lazy load nodes start collapsed
                    if (arr.length == 0) {
                        wjcCore.addClass(node, TreeView._CCLD);
                        expanded = false;
                    }
                } else {
                    wjcCore.addClass(node, TreeView._CCLD);
                    expanded = false;
                    if (level < this._ldLvl) {
                        this._ldLvl = 10000;
                    }
                }

                // add child nodes
                if (arr.length > 0) {

                    // create nodeList
                    var nodeList = document.createElement('div');
                    wjcCore.addClass(nodeList, TreeView._CNDL);
                    for (var i = 0; i < arr.length; i++) {
                        this._addItem(nodeList, level + 1, arr[i]);
                    }
                    host.appendChild(nodeList);

                    // accessibility: https://www.w3.org/TR/wai-aria-1.1/#tree
                    node.setAttribute('aria-expanded', expanded.toString());
                    nodeList.setAttribute('role', 'group');
                }
            } else {
                wjcCore.addClass(node, TreeView._CEMP);
            }

            // format the node
            if (this.formatItem.hasHandlers) {
                this.onFormatItem(new FormatNodeEventArgs(item, node, level));
            }
        }

        // collapse all nodes on the list above the given level
        private _collapseToLevel(nodes: TreeNode[], maxLevel: number, currentLevel: number) {
            for (var i = 0; i < nodes.length; i++) {
                var node = nodes[i];

                // can't lazy-load multiple nodes at once (TFS 245116)
                if (node.hasPendingChildren) {
                    continue;
                }

                // collapse/expand this node and all child nodes (TFS 242904)
                node.isCollapsed = currentLevel >= maxLevel; 
                if (node.hasChildren) {
                    this._collapseToLevel(node.nodes, maxLevel, currentLevel + 1);
                }
            }
        }

        // internal method called by lazy-loaded nodes being expanded
        _lazyLoadNode(node: TreeNode) {
            var host = this.hostElement;
            if (!wjcCore.hasClass(host, TreeView._CLDG)) {
                wjcCore.addClass(host, TreeView._CLDG);
                wjcCore.addClass(node.element, TreeView._CLDG);
                this.lazyLoadFunction(node, this._lazyLoadCallback.bind(node));
            }
        }

        // populate node's children with lazy load results
        private _lazyLoadCallback(result) {
            var node: any = this,
                tree = node.treeView;
            tree._lazyLoadNodeDone(node, result);
        }

        // finish lazy loading
        private _lazyLoadNodeDone(node: TreeNode, result: any[]) {

            // done loading
            var tv = TreeView;
            wjcCore.removeClass(node.element, tv._CLDG);
            wjcCore.removeClass(this.hostElement, tv._CLDG);

            // if result is null or empty, this is an empty node
            var item = node.dataItem,
                level = node.level,
                arr = wjcCore.asArray(result, true);
            if (arr == null || arr.length == 0) {

                // no data, this is an empty node
                this._itmPath.setValue(item, level, null);
                wjcCore.addClass(node.element, tv._CEMP);

            } else if (arr.length) {

                // add dataItems to itemsSource
                this._itmPath.setValue(item, level, arr);

                // add elements to tree
                var nodeList = <HTMLElement>document.createElement('div'),
                    nodeElement = node.element;
                wjcCore.addClass(nodeList, tv._CNDL);
                nodeElement.parentElement.insertBefore(nodeList, nodeElement.nextSibling);
                for (var i = 0; i < arr.length; i++) {
                    this._addItem(nodeList, level + 1, arr[i]);
                }

                // expand the node once it's loaded
                node.isCollapsed = false;
            }
        }
    }



    /**
     * Class that represents a node in a @see:TreeView.
     */
    export class TreeNode {
        _t: TreeView;
        _e: HTMLElement;

        /**
         * Initializes a new instance of a @see:TreeNode.
         *
         * @param treeView @see:TreeView that contains the node.
         * @param nodeElement HTML element that represents the node on the @see:TreeView.
         */
        constructor(treeView: TreeView, nodeElement: HTMLElement) {

            // special case: virtual node in empty tree
            if (wjcCore.hasClass(nodeElement, 'wj-treeview')) {
                treeView = <TreeView>wjcCore.Control.getControl(nodeElement);
                nodeElement = null;
            } else {
                TreeNode._assertNode(nodeElement);
            }

            this._t = treeView;
            this._e = nodeElement;
        }

        /**
         * Gets the data item that this node represents.
         */
        get dataItem(): any {
            return this._e[TreeView._DATAITEM_KEY]
        }
        /**
         * Gets the HTML element that represents this node on the @see:TreeView.
         */
        get element(): any {
            return this._e;
        }
        /**
         * Gets a reference to the @see:TreeView that contains this node.
         */
        get treeView(): TreeView {
            return this._t;
        }
        /**
         * Ensures that a node is visible by expanding any collapsed
         * ancestors and scrolling the element into view.
         */
        ensureVisible() {

            // make sure all parents are expanded
            for (var p = this.parentNode; p; p = p.parentNode) {
                p.isCollapsed = false;
            }

            // scroll into view
            var host = this.treeView.hostElement,
                rco = this.element.getBoundingClientRect(),
                rcc = host.getBoundingClientRect();
            if (rco.bottom > rcc.bottom) {
                host.scrollTop += rco.bottom - rcc.bottom;
            } else if (rco.top < rcc.top) {
                host.scrollTop -= rcc.top - rco.top;
            }
        }
        /**
         * Checks whether this node refers to the same element as another node.
         *
         * @param node @TreeNode to compare with this one.
         */
        equals(node: TreeNode): boolean {
            return node != null && node.element == this.element;
        }
        /**
         * Selects this node.
         */
        select() {
            var tree = this._t;

            // remove selection from previously selected node
            var selNode = tree._selNode;
            if (!this.equals(selNode)) {

                // de-select previous node
                if (selNode) {
                    wjcCore.removeClass(selNode.element, TreeView._CSEL);
                }

                // select this node
                tree._selNode = this;
                wjcCore.addClass(this.element, TreeView._CSEL);
                this.ensureVisible();
                if (tree.containsFocus()) {
                    this.element.focus();
                }

                // raise event
                tree.onSelectedItemChanged();
            }
        }
        /**
         * Gets this node's index within the parent's node collection.
         */
        get index(): number {
            var index = 0;
            for (var p = this._pse(this.element); p; p = this._pse(p)) {
                if (TreeNode._isNode(p)) {
                    index++;
                }
            }
            return index;
        }
        /**
         * Gets this node's parent node.
         *
         * This property returns null for top-level nodes.
         */
        get parentNode(): TreeNode {
            var parent = null;
            if (this._e) {
                var nodeList = this._e.parentElement;
                TreeNode._assertNodeList(nodeList);
                parent = this._pse(nodeList);
            }
            return parent ? new TreeNode(this._t, parent) : null;
        }
        /**
         * Gets this node's level.
         *
         * Top-level nodes have level zero.
         */
        get level(): number {
            var level = -1;
            for (var e: TreeNode = this; e; e = e.parentNode) {
                level++;
            }
            return level;
        }
        /**
         * Gets a value that indicates whether this node has child nodes.
         */
        get hasChildren(): boolean {
            return TreeNode._isNode(this._e) && !TreeNode._isEmpty(this._e);
        }
        /**
         * Gets a value that indicates whether this node has pending child nodes
         * that will be lazy-loaded when the node is expanded.
         */
        get hasPendingChildren(): boolean {
            return this.isCollapsed && this.hasChildren &&
                !TreeNode._isNodeList(this.element.nextElementSibling) &&
                wjcCore.isFunction(this._t.lazyLoadFunction);
        }
        /**
         * Gets an array containing this node's child nodes.
         *
         * This property returns null if the node has no children.
         */
        get nodes(): TreeNode[] {
            return this.hasChildren
                ? TreeNode._getChildNodes(this._t, <HTMLElement>this._e.nextSibling)
                : null;
        }
        /**
         * Gets the HTMLInputElement that represents the checkbox associated
         * with this node.
         */
        get checkBox(): HTMLInputElement {
            return <HTMLInputElement>this._e.querySelector('input.' + TreeView._CNDC);
        }
        /**
         * Gets or sets a value that determines whether this node is expanded or collapsed.
         */
        get isCollapsed(): boolean {
            return this.hasChildren && wjcCore.hasClass(this._e, TreeView._CCLD);
        }
        set isCollapsed(value: boolean) {
            if (value != this.isCollapsed) {
                var tree = this.treeView,
                    e = new TreeNodeEventArgs(this);
                if (tree.onIsCollapsedChanging(e)) {
                    this.setCollapsed(wjcCore.asBoolean(value), tree.isAnimated, tree.autoCollapse);
                    tree.onIsCollapsedChanged(e);
                }
            }
        }
        /**
         * Gets or sets a value that determines whether this node is checked.
         *
         * When the value of this property changes, child and ancestor nodes
         * are automatically updated, and the parent @see:TreeView's
         * @see:TreeView.checkedItemsChanged event is raised.
         */
        get isChecked(): boolean {
            var cb = this.checkBox;
            return cb && !cb.indeterminate
                ? cb.checked
                : null;
        }
        set isChecked(value: boolean) {
            if (value != this.isChecked) {
                var tree = this.treeView,
                    e = new TreeNodeEventArgs(this);
                if (tree.onIsCheckedChanging(e)) {
                    this.setChecked(wjcCore.asBoolean(value), true);
                    tree.onIsCheckedChanged(e);
                }
            }
        }
        /**
         * Gets or sets a value that determines whether this node is disabled.
         *
         * Disabled nodes cannot get mouse or keyboard events.
         */
        get isDisabled(): boolean {
            return this._e && this._e.getAttribute('disabled') != null;
        }
        set isDisabled(value: boolean) {
            value = wjcCore.asBoolean(value, true);
            if (value != this.isDisabled) {
                wjcCore.enable(this._e, !value);
            }
        }
        /**
         * Gets a reference to the previous node in the view.
         *
         * @param visible Whether to return only visible nodes (whose ancestors are not collapsed).
         * @param enabled Whether to return only enabled nodes (whose ancestors are not disabled).
         */
        previous(visible?: boolean, enabled?: boolean): TreeNode {

            // get previous sibling
            var prev = this._pse(this._e);

            // handle first on a node list
            if (!prev && TreeNode._isNodeList(this._e.parentElement)) {
                prev = this._pse(this._e.parentElement);
            }

            // handle nodelists
            if (TreeNode._isNodeList(prev)) {
                while (TreeNode._isNodeList(prev) && prev.childElementCount) { // TFS 246982
                    prev = <HTMLElement>prev.lastChild;
                }
                if (TreeNode._isNodeList(prev)) {
                    prev = this._pse(prev);
                }
            }

            // get previous node
            var node = TreeNode._isNode(prev) ? new TreeNode(this._t, prev) : null;

            // skip invisible and disabled nodes
            if (visible && node && !node.element.offsetHeight) {
                node = node.previous(visible, enabled);
            }
            if (enabled && node && node.isDisabled) {
                node = node.previous(visible, enabled);
            }

            // done
            return node;
        }
        /**
         * Gets a reference to the next node in the view.
         *
         * @param visible Whether to return only visible nodes (whose ancestors are not collapsed).
         * @param enabled Whether to return only enabled nodes (whose ancestors are not disabled).
         */
        next(visible?: boolean, enabled?: boolean): TreeNode {

            // get next sibling
            var next = <HTMLElement>this._e.nextSibling;

            // handle nodelists
            if (TreeNode._isNodeList(next)) {
                next = next.childElementCount
                    ? <HTMLElement>next.firstChild // first node on the expanded list
                    : <HTMLElement>next.nextSibling; // next node after the collapsed list
            }

            // handle last on a node list (TFS 246982)
            if (!next) {
                for (var e = this._e.parentElement; !next && TreeNode._isNodeList(e); e = e.parentElement) {
                    next = <HTMLElement>e.nextSibling;
                }
            }

            // get next node
            var node = TreeNode._isNode(next) ? new TreeNode(this._t, next) : null;

            // skip invisible and disabled nodes
            if (visible && node && !node.element.offsetHeight) {
                node = node.next(visible, enabled);
            }
            if (enabled && node && node.isDisabled) {
                node = node.next(visible, enabled);
            }

            // done
            return node;
        }
        /**
         * Gets a reference to the next sibling node in the view.
         */
        previousSibling(): TreeNode {
            var prev = this._pse(this.element);
            if (TreeNode._isNodeList(prev)) {
                prev = this._pse(prev);
            }
            return prev ? new TreeNode(this.treeView, prev) : null;
        }
        /**
         * Gets a reference to the next sibling node in the view.
         */
        nextSibling(): TreeNode {
            var next = this.element.nextSibling;
            if (TreeNode._isNodeList(next)) {
                next = next.nextSibling;
            }
            return next ? new TreeNode(this.treeView, next) : null;
        }
        /**
         * Sets the collapsed state of the node.
         *
         * @param collapsed Whether to collapse or expand the node.
         * @param animate Whether to use animation when applying the new state.
         * @param collapseSiblings Whether to collapse sibling nodes when expanding
         * this node.
         */
        setCollapsed(collapsed: boolean, animate?: boolean, collapseSiblings?: boolean) {

            // get node and child elements
            var node = this._e,
                list = <HTMLElement>this._e.nextElementSibling,
                hasList = TreeNode._isNodeList(list);

            // accessibility: https://www.w3.org/TR/wai-aria-1.1/#tree
            if (hasList) {
                node.setAttribute('aria-expanded', (!collapsed).toString());
            } else {
                node.removeAttribute('aria-expanded');
            }

            // don't waste time...
            if (collapsed == this.isCollapsed) {
                return;
            }

            // handle lazy-loading
            if (!collapsed && !hasList && wjcCore.isFunction(this._t.lazyLoadFunction)) {
                this._t._lazyLoadNode(this);
                return;
            }

            // resolve default parameters
            if (animate == null) {
                animate = this.treeView.isAnimated;
            }
            if (collapseSiblings == null) {
                collapseSiblings = this.treeView.autoCollapse;
            }

            // update collapsed state
            if (!animate) {
                wjcCore.toggleClass(node, TreeView._CCLD, collapsed);
            } else {
                if (hasList) {
                    if (!collapsed) { // expanding
                        wjcCore.toggleClass(node, TreeView._CCLD, false);
                        var h = list.offsetHeight;
                        var s = list.style;
                        s.height = s.opacity = '0';
                        wjcCore.animate((pct: number) => {
                            if (pct >= 1) {
                                s.height = s.opacity = '';
                            } else {
                                s.height = (pct * h).toFixed(0) + 'px';
                                //s.opacity = pct.toFixed(2);
                            }
                        }, TreeView._AN_DLY);
                    } else { // collapsing
                        var h = list.offsetHeight;
                        var s = list.style;
                        wjcCore.toggleClass(node, TreeView._CCLG, true);
                        wjcCore.animate((pct: number) => {
                            if (pct < 1) {
                                pct = 1 - pct;
                                s.height = (pct * h).toFixed(0) + 'px';
                                //s.opacity = pct.toFixed(2);
                            } else {
                                s.height = s.opacity = '';
                                wjcCore.toggleClass(node, TreeView._CCLD, true);
                                wjcCore.toggleClass(node, TreeView._CCLG, false);
                            }
                        }, TreeView._AN_DLY);
                    }
                }
            }

            // when expanding an item in a node list, collapse all siblings
            if (!collapsed && collapseSiblings) {
                var list = node.parentElement;
                if (TreeNode._isNodeList(list)) {
                    for (var i = 0; i < list.children.length; i++) {
                        var sibling = <HTMLElement>list.children[i];
                        if (sibling != node && TreeNode._isNode(sibling)) {
                            wjcCore.toggleClass(sibling, TreeView._CCLD, true);

                            // accessibility: https://www.w3.org/TR/wai-aria-1.1/#tree
                            sibling.setAttribute('aria-expanded', 'false');
                        }
                    }
                }
            }
        }
        /**
         * Sets the checked state of this node and its children.
         *
         * @param checked Whether to check or uncheck the node and its children.
         * @param updateParent Whether to update the checked state of this node's
         * ancestor nodes.
         */
        setChecked(checked: boolean, updateParent?: boolean) {

            // set this node's checkbox
            var cb = this.checkBox;
            cb.checked = checked;
            cb.indeterminate = false;

            // set direct children's checkboxes
            if (this.hasChildren) {
                var nodes = this.nodes;
                for (var i = 0; i < nodes.length; i++) {
                    var child = nodes[i];
                    child.setChecked(checked, false);
                }
            }

            // update parent checkboxes
            if (updateParent) {
                var parent = this.parentNode;
                if (parent) {
                    parent._updateCheckedState();
                }
            }
        }
        /**
         * Moves a @see:TreeNode to a new position on the @see:TreeView.
         *
         * @param refNode Reference @see:TreeNode that defines the location
         * where the node will be moved.
         * @param position Whether to move the node before, after, or into
         * the reference node.
         * @return True if the node was moved successfully.
         */
        move(refNode: TreeNode, position: DropPosition): boolean {

            // check that the refNode is not a child of this node
            if (this._contains(refNode)) {
                return false;
            }

            // update treeView
            var parentOld = this.parentNode,
                arrOld = this._getArray();
            this._moveElements(refNode, position);
            var parentNew = this.parentNode,
                arrNew = this._getArray();

            // update old and new parent's state (hasChildren, checked)
            if (parentOld) {
                parentOld._updateState();
            }
            if (parentNew) {
                parentNew._updateState();
            }

            // update itemsSource
            var item = this.dataItem,
                index = arrOld.indexOf(item);
            arrOld.splice(index, 1);
            arrNew.splice(this.index, 0, item);

            // update reference to parent TreeView 
            // (in case the node was moved to another parent)
            if (refNode.treeView) {
                this._t = refNode.treeView;
            }

            // all done
            return true;
        }

        // ** private stuff

        // gets an element's previous element sibling
        _pse(e: HTMLElement): HTMLElement {
            return <HTMLElement>e.previousElementSibling;
        }

        // checks whether this node contains another
        _contains(node: TreeNode): boolean {
            for (; node; node = node.parentNode) {
                if (node.element == this.element) {
                    return true;
                }
            }
            return false;
        }

        // gets the array that contains this data item
        _getArray(): any[] {
            var tree = this._t,
                parent = this.parentNode,
                arr: any = tree.itemsSource;
            if (parent) {
                var path = tree._itmPath,
                    arr = path.getValue(parent.dataItem, this.level);
                if (!arr) {
                    arr = [];
                    path.setValue(parent.dataItem, this.level, arr);
                }
            }
            return arr;
        }

        // move node elements to a new position in the tree
        _moveElements(refNode: TreeNode, position: DropPosition) {

            // get reference node's parent so we can move this node into it
            var ref = refNode.element,
                parent = ref ? ref.parentElement : refNode.treeView._root,
                dp = DropPosition;

            // sanity
            TreeNode._assertNodeList(parent);

            // grab this node's elements into a fragment
            var frag = document.createDocumentFragment(),
                nodeList = this.hasChildren && !this.hasPendingChildren
                    ? this.element.nextSibling
                    : null;
            frag.appendChild(this.element);
            if (nodeList) {
                TreeNode._assertNodeList(nodeList);
                frag.appendChild(nodeList);
            }

            // insert fragment at the proper position
            switch (position) {
                case dp.Before:
                    parent.insertBefore(frag, ref);
                    break;
                case dp.After:
                    refNode = refNode.nextSibling();
                    ref = refNode ? refNode.element : null;
                    parent.insertBefore(frag, ref);
                    break;
                case dp.Into:
                    if (!refNode.hasChildren || refNode.hasPendingChildren) {
                        nodeList = document.createElement('div');
                        wjcCore.addClass(nodeList, TreeView._CNDL);
                        parent.insertBefore(nodeList, ref.nextSibling);
                    }
                    parent = refNode.element.nextSibling;
                    TreeNode._assertNodeList(parent);
                    parent.insertBefore(frag, null); // append to list
                    break;
            }
        }

        // update node state after a move operation
        _updateState() {
            this._updateEmptyState();
            this._updateCheckedState();
        }

        // update node empty state
        _updateEmptyState() {

            // check whether we have child nodes, remove empty child lists
            var nodeList = <HTMLElement>this.element.nextSibling,
                hasChildren = false;
            if (TreeNode._isNodeList(nodeList)) {
                if (nodeList.childElementCount) {
                    hasChildren = true;
                } else {
                    nodeList.parentElement.removeChild(nodeList);
                }
            }

            // update the node's empty attribute
            wjcCore.toggleClass(this.element, TreeView._CEMP, !hasChildren);
        }

        // update node checked state
        _updateCheckedState() {
            var cb = this.checkBox,
                nodes = this.nodes,
                checked = 0,
                unchecked = 0;

            // update this node's checked state
            if (cb && nodes) {
                for (var i = 0; i < nodes.length; i++) {
                    var node = nodes[i];
                    switch (node.isChecked) {
                        case true:
                            checked++;
                            break;
                        case false:
                            unchecked++;
                            break;
                    }
                }
                if (checked == nodes.length) {
                    cb.checked = true;
                    cb.indeterminate = false;
                } else if (unchecked == nodes.length) {
                    cb.checked = false;
                    cb.indeterminate = false;
                } else {
                    cb.checked = false;
                    cb.indeterminate = true;
                }
            }

            // move up one level
            var parent = this.parentNode;
            if (parent) {
                parent._updateCheckedState();
            }
        }

        // gets the child nodes from a nodeList
        static _getChildNodes(treeView: TreeView, nodeList: HTMLElement): TreeNode[] {
            TreeNode._assertNodeList(nodeList);
            var arr = [];
            if (TreeNode._isNodeList(nodeList)) {
                var children = nodeList.children;
                for (var i = 0; i < children.length; i++) {
                    var child = <HTMLElement>children[i];
                    if (TreeNode._isNode(child)) {
                        arr.push(new TreeNode(treeView, child));
                    }
                }
            }
            return arr;
        }

        // static methods to check for node state/type based on their class
        static _isNode(e: HTMLElement): boolean {
            return e && wjcCore.hasClass(e, TreeView._CND);
        }
        static _isNodeList(e: HTMLElement): boolean {
            return e && wjcCore.hasClass(e, TreeView._CNDL);
        }
        static _isEmpty(node: HTMLElement): boolean {
            return TreeNode._isNode(node) && wjcCore.hasClass(node, TreeView._CEMP);
        }
        static _isCollapsed(node: HTMLElement): boolean {
            return TreeNode._isNode(node) && !TreeNode._isEmpty(node) && wjcCore.hasClass(node, TreeView._CCLD);
        }
        static _assertNode(node: HTMLElement) {
            wjcCore.assert(TreeNode._isNode(node), 'node expected');
        }
        static _assertNodeList(nodeList: HTMLElement) {
            wjcCore.assert(TreeNode._isNodeList(nodeList), 'nodeList expected');
        }
    }



    /**
     * Provides arguments for the @see:TreeView.formatItem event.
     */
    export class FormatNodeEventArgs extends wjcCore.EventArgs {
        _data: any;
        _e: HTMLElement;
        _level: number;

        /**
         * Initializes a new instance of the @see:FormatNodeEventArgs class.
         *
         * @param dataItem Data item represented by the node.
         * @param element Element that represents the node being formatted.
         * @param level The outline level of the node being formatted.
         */
        constructor(dataItem: any, element: HTMLElement, level: number) {
            super();
            this._data = dataItem;
            this._e = wjcCore.asType(element, HTMLElement);
            this._level = level;
        }
        /**
         * Gets the data item being formatted.
         */
        get dataItem(): any {
            return this._data;
        }
        /**
         * Gets a reference to the element that represents the node being formatted.
         */
        get element(): HTMLElement {
            return this._e;
        }
        /**
         * Gets the outline level of the node being formatted.
         */
        get level(): number {
            return this._level;
        }
    }

    /**
     * Provides arguments for @see:TreeNode-related events.
     */
    export class TreeNodeEventArgs extends wjcCore.CancelEventArgs {
        _node: TreeNode;

        /**
         * Initializes a new instance of the @see:TreeNodeEventArgs class.
         *
         * @param node @see:TreeNode that this event refers to.
         */
        constructor(node: TreeNode) {
            super();
            this._node = node;
        }
        /**
         * Gets the @see:TreeNode that this event refers to.
         */
        get node(): TreeNode {
            return this._node;
        }
    }

    /**
     * Provides arguments for @see:TreeNode drag-drop events.
     */
    export class TreeNodeDragDropEventArgs extends wjcCore.CancelEventArgs {
        _src: TreeNode;
        _tgt: TreeNode;
        _pos: DropPosition;

        /**
         * Initializes a new instance of the @see:TreeNodeEventArgs class.
         *
         * @param dragSource @see:TreeNode being dragged.
         * @param dropTarget @see:TreeNode where the source is being dropped.
         * @param position @see:DropPosition that this event refers to.
         */
        constructor(dragSource: TreeNode, dropTarget: TreeNode, position: DropPosition) {
            super();
            this._src = wjcCore.asType(dragSource, TreeNode);
            this._tgt = wjcCore.asType(dropTarget, TreeNode)
            this._pos = position;
        }
        /**
         * Gets a reference to the @see:TreeNode being dragged.
         */
        get dragSource(): TreeNode {
            return this._src;
        }
        /**
         * Gets a reference to the current @see:TreeNode target.
         */
        get dropTarget(): TreeNode {
            return this._tgt;
        }
        /**
         * Gets or sets the @see:DropPosition value that specifies where
         * the @see:TreeNode will be dropped.
         */
        get position(): DropPosition {
            return this._pos;
        }
        set position(value: DropPosition) {
            this._pos = wjcCore.asEnum(value, DropPosition);
        }
    }

    /**
     * Specifies the position where a @see:TreeNode is being dropped during
     * a drag and drop operation.
     */
    export enum DropPosition {
        /** The node will become the previous sibling of the target node. */
        Before,
        /** The node will become the next sibling of the target node. */
        After,
        /** The node will become the last child of the target node. */
        Into
    };




    /**
     * Class that handles drag/drop operations for a @see:TreeView.
     */
    export class _TreeDragDropManager {
        private _tree: TreeView;
        private _dragstartBnd: Function;
        private _dragoverBnd: Function;
        private _dragendBnd: Function;
        private _dropBnd: Function;

        // static members to allow drag/drop between trees (TFS 242905)
        private static _dMarker = wjcCore.createElement('<div class="wj-marker">&nbsp;</div>');
        private static _drgSrc: TreeNode;

        /**
         * Initializes a new instance of a @see:_TreeViewDragDropManager.
         *
         * @param treeView @see:TreeView managed by this @see:_TreeViewDragDropManager.
         */
        constructor(treeView: TreeView) {
            this._tree = wjcCore.asType(treeView, TreeView);
            this._dragstartBnd = this._dragstart.bind(this);
            this._dragoverBnd = this._dragover.bind(this);
            this._dropBnd = this._drop.bind(this);
            this._dragendBnd = this._dragend.bind(this);

            // add listeners
            var tree = this._tree,
                host = tree.hostElement;
            tree.addEventListener(host, 'dragstart', this._dragstartBnd);
            tree.addEventListener(host, 'dragover', this._dragoverBnd);
            tree.addEventListener(host, 'dragleave', this._dragoverBnd);
            tree.addEventListener(host, 'drop', this._dropBnd);
            tree.addEventListener(host, 'dragend', this._dragendBnd);
            tree.addEventListener(host, 'keydown', this._keydown);
        }

        /**
         * Disposes of this @see:_TreeViewDragDropManager
         */
        dispose() {

            // remove event listeners
            var tree = this._tree,
                host = tree.hostElement;
            tree.removeEventListener(host, 'dragstart', this._dragstartBnd);
            tree.removeEventListener(host, 'dragover', this._dragoverBnd);
            tree.removeEventListener(host, 'dragleave', this._dragoverBnd);
            tree.removeEventListener(host, 'drop', this._dropBnd);
            tree.removeEventListener(host, 'dragend', this._dragendBnd);
            tree.removeEventListener(host, 'keydown', this._keydown);

            // dispose of marker
            this._showDragMarker();
        }

        // drag/drop event handlers
        private _dragstart(e: DragEvent) {
            if (!e.defaultPrevented) {
                var ddm = _TreeDragDropManager;

                // get the node being dragged
                var tree = this._tree,
                    target = <HTMLElement>wjcCore.closest(e.target, '.' + TreeView._CND);
                ddm._drgSrc = TreeNode._isNode(target) ? new TreeNode(tree, target) : null;

                // raise event
                if (ddm._drgSrc) {
                    var ee = new TreeNodeEventArgs(ddm._drgSrc);
                    if (!tree.onDragStart(ee)) {
                        ddm._drgSrc = null;
                    }
                }

                // start dragging or prevent default
                if (ddm._drgSrc && e.dataTransfer) {
                    wjcCore._startDrag(e.dataTransfer, 'copyMove');
                    e.stopPropagation();
                } else {
                    e.preventDefault();
                }
            }
        }
        private _dragover(e: DragEvent) {
            this._handleDragDrop(e, false);
        }
        private _drop(e: DragEvent) {
            this._handleDragDrop(e, true);
        }
        private _dragend(e: DragEvent) {
            _TreeDragDropManager._drgSrc = null;
            this._showDragMarker();
            this._tree.onDragEnd();
        }

        // cancel drag/drop if user presses Escape key
        private _keydown(e: KeyboardEvent) {
            if (!e.defaultPrevented) {
                if (e.keyCode == wjcCore.Key.Escape) {
                    this._dragendBnd(null);
                }
            }
        }

        // perform hit-testing to find the target node and position
        private _handleDragDrop(e: DragEvent, drop: boolean) {
            var ddm = _TreeDragDropManager,
                ee: TreeNodeDragDropEventArgs;
            if (!e.defaultPrevented && ddm._drgSrc) {

                // get target node
                var element = document.elementFromPoint(e.clientX, e.clientY),
                    target = <HTMLElement>wjcCore.closest(element, '.' + TreeView._CND);

                // handle case where destination tree is empty
                if (target == null) {
                    var tt = wjcCore.Control.getControl(<HTMLElement>wjcCore.closest(element, '.wj-treeview'));
                    if (tt instanceof TreeView && tt.totalItemCount == 0) {
                        target = tt.hostElement;
                    }
                }

                // ensure target is not the source
                if (target == ddm._drgSrc.element) {
                    target = null;
                }

                // calculate target details
                if (target) {

                    // get drop position with respect to target node (before/after/into)
                    // note: can't drop into lazy-loading nodes (TFS 246954)
                    var tree = this._tree,
                        targetNode = new TreeNode(tree, target),
                        dp = DropPosition,
                        pos = dp.Into,
                        rc: any = target.getBoundingClientRect(),
                        szCheck = targetNode.hasPendingChildren ? rc.height / 2 : rc.height / 3;
                    if (targetNode.element == null) {

                        // dragging into an empty tree or node with lazy content
                        rc = wjcCore.Rect.fromBoundingRect(rc);
                        rc.inflate(-12, -12);
                        pos = dp.Before;

                    } else if (e.clientY < rc.top + szCheck) {

                        // before this node, easy
                        pos = dp.Before;

                    } else if (e.clientY > rc.bottom - szCheck || targetNode.hasPendingChildren) {

                        // after this node
                        pos = dp.After;

                        // but if it has children and is not collapsed, 
                        // insert before the first child instead
                        if (targetNode.hasChildren && !targetNode.isCollapsed && !targetNode.hasPendingChildren) {
                            pos = dp.Before;
                            targetNode = targetNode.next(true, false);
                            target = targetNode.element;
                            rc = target.getBoundingClientRect();
                        }
                    }

                    // make sure target is not our child
                    if (ddm._drgSrc._contains(targetNode)) {
                        target = null;
                    } else {

                        // prevent dragging to different trees by default
                        ee = new TreeNodeDragDropEventArgs(ddm._drgSrc, targetNode, pos);
                        ee.cancel = ddm._drgSrc.treeView != targetNode.treeView; 
                        if (!tree.onDragOver(ee)) {
                            target = null;
                        }
                    }
                }

                // dragging before the next or after the previous sibling has no effect
                if (target) {
                    pos = ee.position;
                    if (pos == dp.Before) {
                        var next = ee.dragSource.next(true, false);
                        if (next && next.element == target) {
                            target = null;
                        }
                    } else if (pos == dp.After) {
                        var prev = ee.dragSource.previous(true, false);
                        if (prev && prev.element == target) {
                            target = null;
                        }
                    }
                }

                // update the drag marker
                if (target && !drop) {
                    e.dataTransfer.dropEffect = 'move';
                    e.preventDefault();
                    e.stopPropagation(); // prevent scrolling on Android
                    this._showDragMarker(rc, pos);
                } else {
                    this._showDragMarker();
                }

                // make the drop
                if (target && drop) {
                    if (tree.onDrop(ee)) {
                        tree.hostElement.focus(); // TFS 240438
                        var src = ee.dragSource;
                        src.move(ee.dropTarget, ee.position);
                        src.select();
                    }
                }
            }
        }

        // show the drag marker at the given position or remove it from view
        private _showDragMarker(rc?: ClientRect, pos?: DropPosition) {
            var tree = this._tree,
                parent = _TreeDragDropManager._dMarker.parentElement;
            if (rc) {

                // position the marker (accounting for RTL)
                var rcHost = tree.hostElement.getBoundingClientRect(),
                    top = pos == DropPosition.After ? rc.bottom : rc.top;
                var css: any = {
                    top: Math.round(top - rcHost.top + tree.hostElement.scrollTop - 2),
                    width: '75%',
                    height: pos == DropPosition.Into ? rc.height : 4,
                    opacity: pos == DropPosition.Into ? '0.15' : ''
                };
                if (tree.rightToLeft) {
                    css.right = Math.round(rcHost.right - rc.right);
                } else {
                    css.left = Math.round(rc.left - rcHost.left);
                }
                wjcCore.setCss(_TreeDragDropManager._dMarker, css);

                // make sure marker is in the DOM
                if (parent != tree._root) {
                    tree._root.appendChild(_TreeDragDropManager._dMarker);
                }
            } else {

                // remove marker from the DOM
                if (parent) {
                    parent.removeChild(_TreeDragDropManager._dMarker);
                }
            }
        }
    }



    /**
     * Class that handles hierarchical (multi-level) bindings.
     */
    export class _BindingArray {
        _path: any;
        _bindings: wjcCore.Binding[];
        _maxLevel: number;

        /**
         * Initializes a new instance of a _BindingArray.
         *
         * @param path String or array of strings to create bindings from.
         */
        constructor(path?: any) {
            this.path = path;
        }

        /**
         * Gets or sets the names of the properties used for binding.
         */
        get path(): any {
            return this._path;
        }
        set path(value: any) {
            this._path = value;
            if (wjcCore.isString(value)) {
                this._bindings = [
                    new wjcCore.Binding(value)
                ]
            } else if (wjcCore.isArray(value)) {
                this._bindings = [];
                for (var i = 0; i < value.length; i++) {
                    this._bindings.push(new wjcCore.Binding(value[i]));
                }
            } else if (value != null) {
                wjcCore.assert(false, 'Path should be a string or an array of strings.');
            }
            this._maxLevel = this._bindings ? this._bindings.length - 1 : -1;
        }
        /**
         * Gets the binding value for a given data item at a given level.
         *
         * @param dataItem Object that contains the data.
         * @param level Binding level to use for retrieving the data.
         */
        getValue(dataItem: any, level: number) {
            var index = Math.min(level, this._maxLevel);
            return index > -1 ? this._bindings[index].getValue(dataItem) : null;
        }
        /**
         * Sets the binding value on a given data item at a given level.
         *
         * @param dataItem Object that contains the data.
         * @param level Binding level to use for retrieving the data.
         * @param value Value to apply to the data item.
         */
        setValue(dataItem: any, level: number, value: any) {
            var index = Math.min(level, this._maxLevel);
            if (index > -1) {
                this._bindings[index].setValue(dataItem, value);
            }
        }
    }


