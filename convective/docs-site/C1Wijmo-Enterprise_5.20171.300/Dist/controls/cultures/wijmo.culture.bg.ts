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
 * Wijmo culture file: bg (Bulgarian)
 */
module wijmo {
    wijmo.culture = {
        Globalize: {
            name: 'bg',
            displayName: 'Bulgarian',
            numberFormat: {
                '.': ',',
                ',': ' ',
                percent: { pattern: ['-n%', 'n%'] },
                currency: { decimals: 2, symbol: 'лв.', pattern: ['-n $', 'n $'] }
            },
            calendar: {
                '/': '.',
                ':': ':',
                firstDay: 1,
                days: ['неделя', 'понеделник', 'вторник', 'сряда', 'четвъртък', 'петък', 'събота'],
                daysAbbr: ['нед', 'пон', 'вт', 'ср', 'четв', 'пет', 'съб'],
                months: ['януари', 'февруари', 'март', 'април', 'май', 'юни', 'юли', 'август', 'септември', 'октомври', 'ноември', 'декември'],
                monthsAbbr: ['яну', 'фев', 'мар', 'апр', 'май', 'юни', 'юли', 'авг', 'сеп', 'окт', 'ное', 'дек'],
                am: ['', ''],
                pm: ['', ''],
                eras: ['след новата ера'],
                patterns: {
                    d: 'd.M.yyyy "г."', D: 'dd MMMM yyyy "г."',
                    f: 'dd MMMM yyyy "г." H:mm', F: 'dd MMMM yyyy "г." H:mm:ss',
                    t: 'H:mm', T: 'H:mm:ss',
                    m: 'd MMMM', M: 'd MMMM', 
                    y: 'MMMM yyyy "г."', Y: 'MMMM yyyy "г."', 
                    g: 'd.M.yyyy "г." H:mm', G: 'd.M.yyyy "г." H:mm:ss',
                    s: 'yyyy"-"MM"-"dd"T"HH":"mm":"ss'
                },
                
            }
        },
        MultiSelect: {
            itemsSelected: '{count:n0} позиции избрани'
        },
        FlexGrid: {
            groupHeaderFormat: '{name}: <b>{value}</b> ({count:n0} елементи)'
        },
        FlexGridFilter: {

            // filter
            ascending: '\u2191 Възходящо',
            descending: '\u2193 Низходящо',
            apply: 'Приложи',
            clear: 'Изчисти',
            conditions: 'Филтриране по състояние',
            values: 'Филтриране по стойност',

            // value filter
            search: 'Търсене',
            selectAll: 'Избери всички',
            null: '(нищо)',

            // condition filter
            header: 'Показване на елементи със стойност',
            and: 'и',
            or: 'Или',
            stringOperators: [
                { name: '(не е зададено)', op: null },
                { name: 'Е равно на', op: 0 },
                { name: 'Не е равно на', op: 1 },
                { name: 'Започва с', op: 6 },
                { name: 'Завършва с', op: 7 },
                { name: 'Съдържа', op: 8 },
                { name: 'Не съдържа', op: 9 }
            ],
            numberOperators: [
                { name: '(не е зададено)', op: null },
                { name: 'Е равно на', op: 0 },
                { name: 'Не е равно на', op: 1 },
                { name: 'Е по-голямо от', op: 2 },
                { name: 'Е по-голямо или равно на', op: 3 },
                { name: 'Е по-малко от', op: 4 },
                { name: 'Е по-малко или равно на', op: 5 }
            ],
            dateOperators: [
                { name: '(не е зададено)', op: null },
                { name: 'Е равно на', op: 0 },
                { name: 'е преди', op: 4 },
                { name: 'е след', op: 3 }
            ],
            booleanOperators: [
                { name: '(не е зададено)', op: null },
                { name: 'Е равно на', op: 0 },
                { name: 'Не е равно на', op: 1 }
            ]
        },
        olap: {
            PivotFieldEditor: {
                dialogHeader: 'Настройки на поле:',
                header: 'Горен титул:',
                summary: 'Резюме:',
                showAs: 'Покажи като:',
                weighBy: 'Претегля се от:',
                sort: 'Сортиране:',
                filter: 'Филтър:',
                format: 'Формат:',
                sample: 'Проба:',
                edit: 'Редактиране…',
                clear: 'Изчисти',
                ok: 'OK',
                cancel: 'Отказ',
                none: '(няма)',
                sorts: {
                    asc: 'Възходящо',
                    desc: 'Низходящо'
                },
                aggs: {
                    sum: 'Сума',
                    cnt: 'Брой',
                    avg: 'Средно',
                    max: 'Макс.',
                    min: 'Мин.',
                    rng: 'Диапазон',
                    std: 'Отклонение',
                    var: 'Var',
                    stdp: 'StdDevPop',
                    varp: 'VarPop',
                    first: 'Първи',
                    last: 'Последен'
                },
                calcs: {
                    noCalc: 'Без пресмятане',
                    dRow: 'Разликата от предишния ред',
                    dRowPct: '% Разлика от предишния ред',
                    dCol: 'Разлика от предишната колона',
                    dColPct: '% Разлика от предишната колона',
                    dPctGrand: '% от общата сума',
                    dPctRow: '% от общия ред',
                    dPctCol: '% от колона общо',
                    dRunTot: 'Текущи общо',
                    dRunTotPct: '% тичане общо'
                },
                formats: {
                    n0: 'Цяло число (n0)',
                    n2: 'Поплавък (n2)',
                    c: 'Валута (c)',
                    p0: 'Процент (Р0)',
                    p2: 'Процент (Р2)', 
                    n2c: 'Хиляди (n2,)',
                    n2cc: 'Милиони (n2,,)',
                    n2ccc: 'Милиарди (n2,,,)',
                    d: 'Дата (d)',
                    MMMMddyyyy: 'Месец година дни (ММММ dd, yyyy)',
                    dMyy: 'Ден месец година (d/M/yy)',
                    ddMyy: 'Ден месец година (dd/М/yy)',
                    dMyyyy: 'Ден месец година (dd/М/yyyy)',
                    MMMyyyy: 'Месец година (МММ yyy)',
                    MMMMyyyy: 'Месец година (ММММ yyyy)',
                    yyyyQq: 'Тримесечие на година (yyyy "Q"q)',
                    FYEEEEQU: 'Тримесечие на финансова година ("FY"EEEE "Q"U)'
                }
            },
            PivotEngine: {
                grandTotal: 'Обща сума',
                subTotal: 'Междинна сума'
            },
            PivotPanel: {
                fields: 'Изберете полета за добавяне към отчета:',
                drag: 'Плъзнете полетата между площите по-долу:',
                filters: 'Филтри',
                cols: 'Колони',
                rows: 'Редове',
                vals: 'Стойности',
                defer: 'Отложи актуализации',
                update: 'Актуализация'
            },
            _ListContextMenu: {
                up: 'Премести нагоре',
                down: 'Премести надолу',
                first: 'Премести в началото',
                last: 'Преминаване в края',
                filter: 'Премести в съобщението за филтър',
                rows: 'Премести в етикетите на редовете',
                cols: 'Премести в етикетите на колоните',
                vals: 'Премести в стойностите',
                remove: 'Премахни полето',
                edit: 'Настройки за поле…',
                detail: 'Покажи подробности…'
            },
            PivotChart: {
                by: 'от',
                and: 'and'
            },
            DetailDialog: {
                header: 'Изглед на детайл:',
                ok: 'OK',
                items: '{cnt:n0} елементи',
                item: '{cnt} елемент',
                row: 'Ред',
                col: 'Колона'
            }
        },
        Viewer:{
            cancel: 'Отказ',
            ok: 'OK',
            bottom: 'Отдолу:',
            top: 'Връх:',
            right: 'Дясно:',
            left: 'Ляво:',
            margins: 'Полета (инчове)',
            orientation: 'Посока:',
            paperKind: 'Вид хартия:',
            pageSetup: 'Настройка на страница',
            landscape: 'Пейзажно',
            portrait: 'Портретно',
            pageNumber: 'Номер на страница',
            zoomFactor: 'Коефициент на мащабиране',
            paginated: 'Оформление за печат',
            print: 'Печат',
            search: 'Търсене',
            matchCase: 'Със същия регистър',
            wholeWord: 'Съвпадение цяла дума',
            searchResults: 'Резултати от търсенето',
            previousPage: 'Предишна страница',
            nextPage: 'Следваща страница',
            firstPage: 'Първа страница',
            lastPage: 'Последна страница',
            backwardHistory: 'обратно',
            forwardHistory: 'Напред',
            pageCount: 'Брой страници',
            selectTool: 'Изберете инструмент',
            moveTool: 'Move Tool',
            continuousMode: 'Непрекъснат изглед на страница',
            singleMode: 'Единствен изглед на страница',
            wholePage: 'Годни цялата страница',
            pageWidth: 'Ширината на страницата',
            zoomOut: 'Намали',
            zoomIn: 'Увеличи',
            exports: 'Експортиране',
            fullScreen: 'Цял екран',
            exitFullScreen: 'Изход от цял екран',
            hamburgerMenu: 'Инструменти',
            showSearchBar: 'Покажи лентата за търсене',
            viewMenu: 'Опции за оформление',
            searchOptions: 'Опции при търсене',
            matchCaseMenuItem: 'С малки и главни букви',
            wholeWordMenuItem: 'Съвпадение цяла дума',
            thumbnails: 'Страница миниатюри',
            outlines: 'Карта на документа',
            loading: 'Зареждане…',
            pdfExportName: 'Adobe PDF',
            docxExportName: 'Отваряне на XML дума',
            xlsxExportName: 'Отваряне на XML Excel',
            docExportName: 'Microsoft Word',
            xlsExportName: 'Microsoft Excel',
            mhtmlExportName: 'Уеб Архив (MHTML)',
            htmlExportName: 'HTML документ',
            rtfExportName: 'RTF документ',
            metafileExportName: 'Компресиран метафайлове',
            csvExportName: 'CSV',
            tiffExportName: 'TIFF изображения',
            bmpExportName: 'BMP изображения',
            emfExportName: 'Разширен метафайл',
            gifExportName: 'GIF изображения',
            jpgExportName: 'JPEG изображения',
            jpegExportName: 'JPEG изображения',
            pngExportName: 'PNG изображения',
            abstractMethodException: 'Това е един абстрактен метод, моля да я прилагат.',
            cannotRenderPageNoViewPage: 'Не може да направи, без документ източник и изглед на страница.',
            cannotRenderPageNoDoc: 'Не може да направи, без документ източник и изглед на страница.',
            exportFormat: 'Формат за експортиране:',
            exportOptionTitle: 'Опции за експортиране',
            documentRestrictionsGroup: 'Документ ограничения',
            passwordSecurityGroup: 'Защита на паролите',
            outputRangeGroup: 'Изходният диапазон',
            documentInfoGroup: 'Информация за документа',
            generalGroup: 'Общи',
            docInfoTitle: 'Обръщение',
            docInfoAuthor: 'Автор',
            docInfoManager: 'Диспечер',
            docInfoOperator: 'Оператор',
            docInfoCompany: 'Фирма',
            docInfoSubject: 'Тема',
            docInfoComment: 'Коментиране',
            docInfoCreator: 'създател',
            docInfoProducer: 'Продуцент',
            docInfoCreationTime: 'Час на създаване',
            docInfoRevisionTime: 'Време за преразглеждане',
            docInfoKeywords: 'Ключови думи',
            embedFonts: 'Включвай TrueType шрифтове',
            pdfACompatible: 'PDF/A съвместими (ниво 2б)',
            useCompression: 'Използва компресия',
            useOutlines: 'Генериране на контурите',
            allowCopyContent: 'Позволи съдържание копиране или извличане',
            allowEditAnnotations: 'Позволи редактиране на анотация',
            allowEditContent: 'Позволи редактиране на съдържание',
            allowPrint: 'Позволи печат',
            ownerPassword: 'Парола за достъп (собственик):',
            userPassword: 'Парола документ отворен (потребител):',
            encryptionType: 'Ниво на шифроване:',
            paged: 'Във виртуалната',
            showNavigator: 'Покажи навигатор',
            singleFile: 'Един файл',
            tolerance: 'Толеранс при откриване на текст границите (точки):',
            pictureLayer: 'Използвайте отделна снимка слой',
            metafileType: 'Метафайл тип:',
            monochrome: 'Монохромно',
            resolution: 'Разделителна способност:',
            outputRange: 'Обхват на страници:',
            outputRangeInverted: 'Обърнати',
            showZoomBar: 'Zoom пръчка',
            searchPrev: 'Търси предишен',
            searchNext: 'Търси следващ',
            checkMark: '\u2713',
            exportOk: 'Експортиране…',
            parameters: 'Параметри',
            requiringParameters: 'Моля, въведете параметри.',
            nullParameterError: 'Стойността не може да бъде нула.',
            invalidParameterError: 'Невалиден вход.',
            parameterNoneItemsSelected: '(няма)',
            parameterAllItemsSelected: '(всички)',
            parameterSelectAllItemText: '(Избери всички)',
            selectParameterValue: '(изберете стойност)',
            apply: 'Приложи',
            errorOccured: 'Възникна грешка.'
        }
    };

    let updc = window['wijmo']._updateCulture;
    if (updc) {
        updc();
    }
};
