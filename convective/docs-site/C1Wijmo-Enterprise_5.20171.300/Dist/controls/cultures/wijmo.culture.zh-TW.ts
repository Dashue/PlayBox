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
/*
 * Wijmo culture file: zh-TW (Chinese (Traditional, Taiwan))
 */
module wijmo {
    wijmo.culture = {
        Globalize: {
            name: 'zh-TW',
            displayName: 'Chinese (Traditional, Taiwan)',
            numberFormat: {
                '.': '.',
                ',': ',',
                percent: { pattern: ['-n%', 'n%'] },
                currency: { decimals: 2, symbol: 'NT$', pattern: ['-$n', '$n'] }
            },
            calendar: {
                '/': '/',
                ':': ':',
                firstDay: 0,
                days: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
                daysAbbr: ['週日', '週一', '週二', '週三', '週四', '週五', '週六'],
                months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                monthsAbbr: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                am: ['上午', '上'],
                pm: ['下午', '下'],
                eras: ['西元'],
                patterns: {
                    d: 'yyyy/M/d', D: 'yyyy"年"M"月"d"日"',
                    f: 'yyyy"年"M"月"d"日" tt hh:mm', F: 'yyyy"年"M"月"d"日" tt hh:mm:ss',
                    t: 'tt hh:mm', T: 'tt hh:mm:ss',
                    m: 'M"月"d"日"', M: 'M"月"d"日"', 
                    y: 'yyyy"年"M"月"', Y: 'yyyy"年"M"月"', 
                    g: 'yyyy/M/d tt hh:mm', G: 'yyyy/M/d tt hh:mm:ss',
                    s: 'yyyy"-"MM"-"dd"T"HH":"mm":"ss'
                },
                
            }
        },
        MultiSelect: {
            itemsSelected: '選定{count:n0}個項目'
        },
        FlexGrid: {
            groupHeaderFormat: '{name}: <b>{value}</b> ({count:n0} 項目)'
        },
        FlexGridFilter: {

            // filter
            ascending: '\u2191 遞增排序',
            descending: '\u2193 遞減排序',
            apply: '應用',
            clear: '清除',
            conditions: '依條件篩選',
            values: '依值篩選',

            // value filter
            search: '搜尋',
            selectAll: '選取全部',
            null: '(無)',

            // condition filter
            header: '顯示項目的值為',
            and: '與',
            or: '或',
            stringOperators: [
                { name: '(未設定)', op: null },
                { name: '等於', op: 0 },
                { name: '不等於', op: 1 },
                { name: '開頭為', op: 6 },
                { name: '結尾為', op: 7 },
                { name: '包含', op: 8 },
                { name: '不包含', op: 9 }
            ],
            numberOperators: [
                { name: '(未設定)', op: null },
                { name: '等於', op: 0 },
                { name: '不等於', op: 1 },
                { name: '大於', op: 2 },
                { name: '大於或等於', op: 3 },
                { name: '小於', op: 4 },
                { name: '小於或等於', op: 5 }
            ],
            dateOperators: [
                { name: '(未設定)', op: null },
                { name: '等於', op: 0 },
                { name: '早於', op: 4 },
                { name: '晚於', op: 3 }
            ],
            booleanOperators: [
                { name: '(未設定)', op: null },
                { name: '等於', op: 0 },
                { name: '不等於', op: 1 }
            ]
        },
        olap: {
            PivotFieldEditor: {
                dialogHeader: '欄位設置:',
                header: '欄位名稱:',
                summary: '摘要:',
                showAs: '顯示為:',
                weighBy: '通過權衡:',
                sort: '排序:',
                filter: '篩選器:',
                format: '格式:',
                sample: '示例:',
                edit: '編輯…',
                clear: '清除',
                ok: '確定',
                cancel: '取消',
                none: '(不擬校對)',
                sorts: {
                    asc: '遞增',
                    desc: '遞減'
                },
                aggs: {
                    sum: '加總',
                    cnt: '計數',
                    avg: '平均',
                    max: '最大值',
                    min: '分鐘',
                    rng: '範圍',
                    std: '標準差',
                    var: 'VAR',
                    stdp: 'StdDevPop',
                    varp: 'VarPop',
                    first: '第一個',
                    last: '最後一個'
                },
                calcs: {
                    noCalc: '無計算',
                    dRow: '上一行的區別',
                    dRowPct: '%上一行的區別',
                    dCol: '前一篇專欄的區別',
                    dColPct: '%上一列的區別',
                    dPctGrand: '總計的百分比',
                    dPctRow: '%的行總數',
                    dPctCol: '%的列合計',
                    dRunTot: '運行總和',
                    dRunTotPct: '總運行 %'
                },
                formats: {
                    n0: '整數 (n0)',
                    n2: '浮 (n2)',
                    c: '(C) 貨幣',
                    p0: '百分比 (p0)',
                    p2: '百分比 (p2)', 
                    n2c: '數千人 (n2，)',
                    n2cc: '數以百萬計 (n2、、)',
                    n2ccc: '數十億 (n2、、、)',
                    d: '日期 (d)',
                    MMMMddyyyy: '月天年 （MMMM dd，yyyy）',
                    dMyy: '天月年 (d/M/yy)',
                    ddMyy: '天月年 (dd/M/yy)',
                    dMyyyy: '天月年 (dd/M/yyyy)',
                    MMMyyyy: '月年 (MMM yyyy)',
                    MMMMyyyy: '月年 (MMMM yyyy)',
                    yyyyQq: '去年季度 (yyyy"Q"q)',
                    FYEEEEQU: '財政年度季度 ("FY"哎"Q"U)'
                }
            },
            PivotEngine: {
                grandTotal: '總計',
                subTotal: '小計'
            },
            PivotPanel: {
                fields: '選擇要向報表中添加欄位:',
                drag: '在以下區域之間拖曳欄位:',
                filters: '篩選',
                cols: '欄',
                rows: '列',
                vals: '值',
                defer: '推遲更新',
                update: '更新'
            },
            _ListContextMenu: {
                up: '上移',
                down: '下移',
                first: '移動至開頭',
                last: '移動至結尾',
                filter: '移到報表篩選',
                rows: '移到列標籤',
                cols: '移到欄標籤',
                vals: '移到值',
                remove: '移除欄位',
                edit: '欄位設定…',
                detail: '顯示詳細資訊…'
            },
            PivotChart: {
                by: '乘',
                and: '和'
            },
            DetailDialog: {
                header: '詳細資訊視圖:',
                ok: '確定',
                items: '{cnt:n0} 專案',
                item: '{cnt} 專案',
                row: '資料列',
                col: '直條圖'
            }
        },
        Viewer:{
            cancel: '取消',
            ok: '確定',
            bottom: '下:',
            top: '上:',
            right: '右:',
            left: '左:',
            margins: '邊界 (英吋)',
            orientation: '定位:',
            paperKind: '紙類:',
            pageSetup: '設定列印格式',
            landscape: '橫向',
            portrait: '縱向',
            pageNumber: '頁碼',
            zoomFactor: '縮放係數',
            paginated: '整頁模式',
            print: '列印',
            search: '搜尋',
            matchCase: '大小寫須相符',
            wholeWord: '全字拼寫須相符',
            searchResults: '搜尋結果',
            previousPage: '上一頁',
            nextPage: '下一頁',
            firstPage: '第一頁',
            lastPage: '最後一頁',
            backwardHistory: '往後',
            forwardHistory: '轉寄',
            pageCount: '頁面計數',
            selectTool: '選擇工具',
            moveTool: '移動工具',
            continuousMode: '連續的網頁視圖',
            singleMode: '單一的網頁視圖',
            wholePage: '適應整頁',
            pageWidth: '頁面寬度',
            zoomOut: '拉遠顯示',
            zoomIn: '拉近顯示',
            exports: '匯出',
            fullScreen: '全螢幕',
            exitFullScreen: '結束全螢幕',
            hamburgerMenu: '工具',
            showSearchBar: '顯示搜尋列',
            viewMenu: '佈局選項',
            searchOptions: '搜尋選項',
            matchCaseMenuItem: '大小寫須相符',
            wholeWordMenuItem: '全字匹配',
            thumbnails: '頁面縮略圖',
            outlines: '文件引導模式',
            loading: '正在載入…',
            pdfExportName: 'Adobe PDF',
            docxExportName: '打開 XML 詞',
            xlsxExportName: '打開 XML Excel',
            docExportName: 'Microsoft Word',
            xlsExportName: 'Microsoft Excel',
            mhtmlExportName: 'Web 檔案 (MHTML)',
            htmlExportName: 'HTML 文檔',
            rtfExportName: 'RTF 文檔',
            metafileExportName: '壓縮的圖中繼檔',
            csvExportName: 'CSV',
            tiffExportName: 'Tiff 圖像',
            bmpExportName: 'BMP 圖像',
            emfExportName: '增強型圖中繼檔',
            gifExportName: 'GIF 圖像',
            jpgExportName: 'JPEG 圖像',
            jpegExportName: 'JPEG 圖像',
            pngExportName: 'PNG 圖像',
            abstractMethodException: '這是一種抽象的方法，請執行它。',
            cannotRenderPageNoViewPage: '無法呈現無文檔源頁面和視圖頁面。',
            cannotRenderPageNoDoc: '無法呈現無文檔源頁面和視圖頁面。',
            exportFormat: '匯出格式︰',
            exportOptionTitle: '匯出選項',
            documentRestrictionsGroup: '文檔限制',
            passwordSecurityGroup: '密碼安全性',
            outputRangeGroup: '輸出範圍',
            documentInfoGroup: '文檔資訊',
            generalGroup: '一般',
            docInfoTitle: '標題',
            docInfoAuthor: '製作者',
            docInfoManager: '主管',
            docInfoOperator: '運算子',
            docInfoCompany: '公司',
            docInfoSubject: '主旨',
            docInfoComment: 'Comment',
            docInfoCreator: '建立者',
            docInfoProducer: '製作人',
            docInfoCreationTime: '創建時間',
            docInfoRevisionTime: '修改時間',
            docInfoKeywords: '關鍵字',
            embedFonts: '內嵌 TrueType 字型',
            pdfACompatible: 'PDF/A 相容 (水準 2B)',
            useCompression: '使用壓縮',
            useOutlines: '生成的輪廓',
            allowCopyContent: '允許內容複寫或提取',
            allowEditAnnotations: '允許編輯注釋',
            allowEditContent: '允許內容編輯',
            allowPrint: '允許列印',
            ownerPassword: '許可權 （擁有者） 密碼︰',
            userPassword: '文檔打開 （使用者） 密碼︰',
            encryptionType: '加密級別︰',
            paged: '已分頁',
            showNavigator: '顯示導覽',
            singleFile: '單個檔',
            tolerance: '容限時檢測文本邊界 （點）︰',
            pictureLayer: '使用單獨的圖片圖層',
            metafileType: '圖元檔案類型︰',
            monochrome: '單色',
            resolution: '解析度:',
            outputRange: '頁面範圍︰',
            outputRangeInverted: '反轉',
            showZoomBar: '縮放欄',
            searchPrev: '搜尋上一個',
            searchNext: '搜尋下一個',
            checkMark: '\u2713',
            exportOk: '出口…',
            parameters: '參數',
            requiringParameters: '請輸入參數。',
            nullParameterError: '值不能為 null。',
            invalidParameterError: '輸入無效。',
            parameterNoneItemsSelected: '(不擬校對)',
            parameterAllItemsSelected: '(全部)',
            parameterSelectAllItemText: '(選擇所有)',
            selectParameterValue: '(選擇的值)',
            apply: '應用',
            errorOccured: '已發生錯誤。'
        }
    };

    let updc = window['wijmo']._updateCulture;
    if (updc) {
        updc();
    }
};
