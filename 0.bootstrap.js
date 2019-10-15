(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "../pkg/wasm_sudoku.js":
/*!*****************************!*\
  !*** ../pkg/wasm_sudoku.js ***!
  \*****************************/
/*! exports provided: solve_from_array */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"solve_from_array\", function() { return solve_from_array; });\n/* harmony import */ var _wasm_sudoku_bg_wasm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./wasm_sudoku_bg.wasm */ \"../pkg/wasm_sudoku_bg.wasm\");\n\n\nlet cachegetUint32Memory = null;\nfunction getUint32Memory() {\n    if (cachegetUint32Memory === null || cachegetUint32Memory.buffer !== _wasm_sudoku_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer) {\n        cachegetUint32Memory = new Uint32Array(_wasm_sudoku_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer);\n    }\n    return cachegetUint32Memory;\n}\n\nlet WASM_VECTOR_LEN = 0;\n\nfunction passArray32ToWasm(arg) {\n    const ptr = _wasm_sudoku_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"__wbindgen_malloc\"](arg.length * 4);\n    getUint32Memory().set(arg, ptr / 4);\n    WASM_VECTOR_LEN = arg.length;\n    return ptr;\n}\n\nlet cachegetInt32Memory = null;\nfunction getInt32Memory() {\n    if (cachegetInt32Memory === null || cachegetInt32Memory.buffer !== _wasm_sudoku_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer) {\n        cachegetInt32Memory = new Int32Array(_wasm_sudoku_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer);\n    }\n    return cachegetInt32Memory;\n}\n\nfunction getArrayU32FromWasm(ptr, len) {\n    return getUint32Memory().subarray(ptr / 4, ptr / 4 + len);\n}\n/**\n* @param {Uint32Array} input\n* @returns {Uint32Array}\n*/\nfunction solve_from_array(input) {\n    const retptr = 8;\n    const ret = _wasm_sudoku_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"solve_from_array\"](retptr, passArray32ToWasm(input), WASM_VECTOR_LEN);\n    const memi32 = getInt32Memory();\n    const v0 = getArrayU32FromWasm(memi32[retptr / 4 + 0], memi32[retptr / 4 + 1]).slice();\n    _wasm_sudoku_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"__wbindgen_free\"](memi32[retptr / 4 + 0], memi32[retptr / 4 + 1] * 4);\n    return v0;\n}\n\n\n\n//# sourceURL=webpack:///../pkg/wasm_sudoku.js?");

/***/ }),

/***/ "../pkg/wasm_sudoku_bg.wasm":
/*!**********************************!*\
  !*** ../pkg/wasm_sudoku_bg.wasm ***!
  \**********************************/
/*! exports provided: memory, solve_from_array, __wbindgen_malloc, __wbindgen_free */
/***/ (function(module, exports, __webpack_require__) {

eval("\"use strict\";\n// Instantiate WebAssembly module\nvar wasmExports = __webpack_require__.w[module.i];\n__webpack_require__.r(exports);\n// export exports from WebAssembly module\nfor(var name in wasmExports) if(name != \"__webpack_init__\") exports[name] = wasmExports[name];\n// exec imports from WebAssembly module (for esm order)\n\n\n// exec wasm module\nwasmExports[\"__webpack_init__\"]()\n\n//# sourceURL=webpack:///../pkg/wasm_sudoku_bg.wasm?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var wasm_sudoku__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! wasm-sudoku */ \"../pkg/wasm_sudoku.js\");\n\n\nconst solutionDiv = document.getElementById(\"solution\");\nconst solveButton = document.getElementById(\"solve\");\n\ndocument.getElementById(\"pick\").addEventListener(\"click\", () => {\n    resetPuzzle();\n    let pickIndex = (Math.floor(Math.random()*puzzles.length)%puzzles.length);\n    setPuzzle(puzzles[pickIndex]);\n    solutionDiv.innerHTML = \"\";\n});\n\nsolveButton.addEventListener(\"click\", () => {\n    solutionDiv.innerHTML = \"<strong>Solving ...</strong>\\n\";\n    setTimeout(() => {\n        let puzzle = readPuzzle();\n        if (!puzzle || puzzle.length < 81){\n            alert(\"Invalid Puzzle!!\");\n            return;\n        }\n        let st = new Date();\n        let sol = Object(wasm_sudoku__WEBPACK_IMPORTED_MODULE_0__[\"solve_from_array\"])(puzzle);\n        let et = new Date();\n        if (!sol || sol.includes(0)){\n            solutionDiv.innerHTML = \"<strong>No solution found; Input may be invalid.</strong>\";\n            return;\n        }\n        setPuzzle(sol);\n        solutionDiv.innerHTML = \"<pre>Time Taken: \" + (et - st) + \" milliseconds.</pre>\";\n    }, 0);\n});\n\nconst rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];\nconst cols = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];\n\n\nconst resetPuzzle = () => {\n    for (let r in rows){\n        for (let c in cols){\n            let id = rows[r] + cols[c];\n            let inpElem = document.getElementById(id);\n            inpElem.value = \"\";\n        }\n    }\n};\n\n\n\nconst setPuzzle = (puzzle) => {\n    let digIndex = 0;\n    for (let r in rows){\n        for (let c in cols){\n            let id = rows[r] + cols[c];\n            let dig = puzzle[digIndex++];\n            let inpElem = document.getElementById(id);\n            if (dig > 0) {\n                inpElem.value = dig;\n            }\n        }\n    }\n};\n\nconst readPuzzle = () => {\n    let puzzle = [];\n    for (let r in rows){\n        for (let c in cols){\n            let id = rows[r] + cols[c];\n            let inpElem = document.getElementById(id);\n            let num = Number(inpElem.value);\n            if (isNaN(num) || num > 9 || num < 1) {\n                puzzle.push(0)\n            } else {\n                puzzle.push(num)\n            }\n        }\n    }\n    return Uint32Array.of(...puzzle);\n};\n\nconst puzzles = [\n    \"400000805030000000000700000020000060000080400000010000000603070500200000104000000\",\n    \"520006000000000701300000000000400800600000050000000000041800000000030020008700000\",\n    \"600000803040700000000000000000504070300200000106000000020000050000080600000010000\",\n    \"480300000000000071020000000705000060000200800000000000001076000300000400000050000\",\n    \"000014000030000200070000000000900030601000000000000080200000104000050600000708000\",\n    \"000000520080400000030009000501000600200700000000300000600010000000000704000000030\",\n    \"602050000000003040000000000430008000010000200000000700500270000000000081000600000\",\n    \"052400000000070100000000000000802000300000600090500000106030000000000089700000000\",\n    \"602050000000004030000000000430008000010000200000000700500270000000000081000600000\",\n    \"092300000000080100000000000107040000000000065800000000060502000400000700000900000\",\n    \"600302000050000010000000000702600000000000054300000000080150000000040200000000700\",\n    \"060501090100090053900007000040800070000000508081705030000050200000000000076008000\",\n    \"005000987040050001007000000200048000090100000600200000300600200000009070000000500\",\n    \"306070000000000051800000000010405000700000600000200000020000040000080300000500000\",\n    \"100000308070400000000000000203010000000000095800000000050600070000080200040000000\",\n    \"600302000040000010000000000702600000000000054300000000080150000000040200000000700\",\n    \"000030090000200001050900000000000000102080406080500020075000000401006003000004060\",\n    \"450000030000801000090000000000050090200700000800000000010040000000000702000600800\",\n    \"023700006800060590900000700000040970307096002000000000500470000000002000080000000\",\n    \"008400030000300000900001574790008000000007005140000020009060002050000400000090056\",\n    \"098010000200000060000000000000302050084000000000600000000040809300500000000000100\",\n    \"002470058000000000000001040000020009528090400009000100000000030300007500685002000\",\n    \"400000805030000000000700000020000060000050400000010000000603070500200000109000000\",\n    \"020300000063000005800000001500009030000700000000100008087900260000006070006007004\",\n    \"100000709040007200800000000070010060300000005060040020000000008005300070702000046\",\n    \"400000300000802000000700000000100087340000000600000000500060000000010400082000000\",\n    \"000000071020800000000403000700060050000200300900000000600070000080000400000050000\",\n    \"600302000040000080000000000702600000000000054300000000080150000000080200000000700\",\n    \"047080001000000000000600700600003570000005000010060000280040000090100040000020690\",\n    \"000000801700200000000506000000700050010000300080000000500000020040080000600030000\",\n    \"380600000009000000020030510000005000030010060000400000017050080000000900000007032\",\n    \"000500000000000506970000020004802000250100030080030000000004070013050090020003100\",\n    \"020000000305062009068000300050000000000640802004700900003000001000006000170430000\",\n    \"080040000300000010000000020005000406900100800200000000000309000060000500000200000\",\n    \"008090100060500020000006000030107050000000009004000300050000200070003080200700004\",\n    \"400000508030000000000700000020000060000050800000010000000603070500200000108000000\",\n    \"100000308060400000000000000203010000000000095800000000050600070000080200040000000\",\n    \"100006080064000000000040007000090600070400500500070100050000320300008000400000000\",\n    \"249060003030000200800000005000006000000200000010040820090500700004000001070003000\",\n    \"000800009087300040600700000008500970000000000043007500000003000030001450400002001\",\n    \"000501000090000800060000000401000000000070090000000030800000105000200400000360000\",\n    \"000000801600200000000705000000600020010000300080000000200000070030080000500040000\",\n    \"047600050803000002000009000000805006000100000602400000078000510006000040090004007\",\n    \"000007095000001000860020000020073008500000060003004900305000417240000000000000000\",\n    \"040500000800090030076020000014600000000009007000003600001004050060000003007100200\",\n    \"083400000000070050000000000040108000000000027000300000206050000500000800000000100\",\n    \"009000003000009000700000506006500400000300000028000000300750600600000000000120308\",\n    \"026039000000600001900000700000004009050000200008500000300200900400007620000000004\",\n    \"203080000800700000000000100060507000400000030000100000000000082050000600010000000\",\n    \"600302000010000050000000000702600000000000084300000000080150000000080200000000700\",\n    \"100000900064001070070040000000300000308900500007000020000060709000004010000129030\",\n    \"000000000900000084062300050000600045300010006000900070000100000405002000030800009\",\n    \"020000593800500460940060008002030000060080730700200000000040380070000600000000005\",\n    \"904005000250600100310000008070009000400260000001470000700000002000300806040000090\",\n    \"000520000090003004000000700010000040080045300600010008702000000008000032040080010\",\n    \"530020900024030050009000000000010827000700000000098100000000000006400009102050430\",\n    \"100007860007008010800200009000000002400010000009005000608000000000050900000009304\",\n    \"000050001100000070060000080000004000009010300000596020080062007007000000305070200\",\n    \"047020000800001000030000902000005000600810050000040000070000304000900010400270800\",\n    \"000000940000090005300005070080400100463000000000007080800700000700000028050260000\",\n    \"020000006000041000007800001000000700003700000600412000010074005008050070000003900\",\n    \"100000308060400000000000000203010000000000075800000000070500060000080200040000000\",\n    \"200001090010030700900800020000000850060400000000070003020300060000500000109000205\",\n    \"007008000006020300030000009010050060000010000070900002000000004083004000260000510\",\n    \"000360000850000000904008000000006800000000017009004500010500060400009002000003000\",\n    \"340600000007000000020080570000005000070010020000400000036020010000000900000007082\",\n    \"000000401800200000000607000000800060040000300010000000600000020050010000700030000\",\n    \"040050067000100040000200000100800300000000200060000000000040050300000800200000000\",\n    \"000000040002004001070050090003007000040060000600100800020000100850900060000080003\",\n    \"800700004050000600000000000030970008000043005000020900006000000200060007071008302\",\n    \"080004050000700300000000000010085000600000200000040000302600000000000041700000000\",\n    \"000070080006000500020003061010007002008005340200900000002000000580006030400010000\",\n    \"000000801600200000000705000000600020010000300080000000200000070040080000500030000\",\n    \"020000000000600003074080000000003002080040010600500000000010780500009000000000040\",\n    \"052006800000007020000000600004800900200410000001000008006100380000090006300600109\",\n    \"000010780500009000000000040020000000000600003074080000000003002080040010600500000\",\n    \"100000003060300700070005001210700090007000000008010020000806400009020060000400000\",\n    \"400070100001904605000001000000700002002030000847006000014000806020000300600090000\",\n    \"000000801700200000000506000000700050010000300080000000500000020030080000600040000\",\n    \"963000000100008000000205000040800000010000700000030025700000030009020407000000900\",\n    \"150300000070040200004072000008000000000900108010080790000003800000000000600007423\",\n    \"000000000057240009800009470009003000500900120003010900060000250000560000070000006\",\n    \"000075000010020000040003000500000302000800010000000600000100480200000000700000000\",\n    \"600000703040800000000000000000504080700200000103000000020000050000070900000010000\",\n    \"000060004006030000100400507700000805000800000608000090002090000400003200009700100\",\n    \"032000005800300000904280001000400039000600050000010000020006708000004000095000060\",\n    \"000503000000060700508000016360020000000401000000030005670000208004070000000200500\",\n    \"050307040100000000030000000508030610000800509060010000000040006000692700002000900\",\n    \"005008001800000090000000780000400000640000900000053002060000000001380050000907140\",\n    \"000000000072060100005100082080001300400000000037090010000023800504009000000000790\",\n    \"000658000004000000120000000000009607000300500002080003001900800306000004000047300\",\n    \"020300000006008090830500000000200080709005000000006004000000010001000402200700809\",\n    \"050090000100000600000308000008040009514000000030000200000000004080006007700150060\",\n    \"000002000000070001700300090800700000020890600013006000090050824000008910000000000\",\n    \"300080000000700005100000000000000360002004000070000000000060130045200000000000800\"];\n\n\n//# sourceURL=webpack:///./index.js?");

/***/ })

}]);