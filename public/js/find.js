/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/*!******************************!*\
  !*** ./resources/js/find.js ***!
  \******************************/
eval("$(document).ready(function () {\n  // обрабатываем нажатие на кнопку\n  $(\"#searchButton\").click(function () {\n    // очищаем переменную, в которой будет наш поисковый запрос\n    var term = \"\"; // и переменную, которая отвечает за количество найденных совпадений\n\n    var n = \"0\"; // убираем всю подсветку из прошлого поиска, если она была\n    // $('body').removeHiddenElems;\n    // скрываем блок с текстом о количестве найденных результатов\n\n    $('p.results').hide().empty(); // с помощью магии jQuery берём текст из строки поиска и кладём его в переменную term\n\n    term = $('#searchInput').attr('value'); // если строка поиска пустая — выводим сообщение\n\n    if ($('#searchInput').val() == \"\") {\n      $(\"p.results\").fadeIn().append(\"Вы ничего не ввели :(\");\n      return false; // иначе, если в строке поиска что-то было…\n    } else {\n      // в блоке content, где у нас находится весь текст, плагином подсвечиваем все найденные совпадения (если совпадений не будет — не будет и подсветки)\n      // $('table').highlight( term );\n      $('table').highlight$1$color('red'); // берём количество совпадений\n\n      n = $(\"span.highlight\").length; // если совпадений нет — в разделе results пишем, что ничего не нашли\n\n      if (n == 0) {\n        $(\"p.results\").fadeIn().append(\"Ничего такого в тексте нет\"); // иначе в том же разделе пишем число совпадений\n      } else {\n        $(\"p.results\").fadeIn().append('Найдено совпадений:' + n);\n      }\n\n      return false;\n    }\n  });\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvZmluZC5qcz8xZDliIl0sIm5hbWVzIjpbIiQiLCJkb2N1bWVudCIsInJlYWR5IiwiY2xpY2siLCJ0ZXJtIiwibiIsImhpZGUiLCJlbXB0eSIsImF0dHIiLCJ2YWwiLCJmYWRlSW4iLCJhcHBlbmQiLCJoaWdobGlnaHQkMSRjb2xvciIsImxlbmd0aCJdLCJtYXBwaW5ncyI6IkFBQUFBLENBQUMsQ0FBQ0MsUUFBRCxDQUFELENBQVlDLEtBQVosQ0FBa0IsWUFBVTtBQUV4QjtBQUNBRixFQUFBQSxDQUFDLENBQUMsZUFBRCxDQUFELENBQW1CRyxLQUFuQixDQUF5QixZQUFVO0FBRS9CO0FBQ0EsUUFBSUMsSUFBSSxHQUFHLEVBQVgsQ0FIK0IsQ0FLL0I7O0FBQ0EsUUFBSUMsQ0FBQyxHQUFHLEdBQVIsQ0FOK0IsQ0FRL0I7QUFDQTtBQUVBOztBQUNBTCxJQUFBQSxDQUFDLENBQUMsV0FBRCxDQUFELENBQWVNLElBQWYsR0FBc0JDLEtBQXRCLEdBWitCLENBYy9COztBQUNBSCxJQUFBQSxJQUFJLEdBQUdKLENBQUMsQ0FBQyxjQUFELENBQUQsQ0FBa0JRLElBQWxCLENBQXVCLE9BQXZCLENBQVAsQ0FmK0IsQ0FpQi9COztBQUNBLFFBQUdSLENBQUMsQ0FBQyxjQUFELENBQUQsQ0FBa0JTLEdBQWxCLE1BQTJCLEVBQTlCLEVBQWlDO0FBQzdCVCxNQUFBQSxDQUFDLENBQUMsV0FBRCxDQUFELENBQWVVLE1BQWYsR0FBd0JDLE1BQXhCLENBQStCLHVCQUEvQjtBQUNBLGFBQU8sS0FBUCxDQUY2QixDQUk3QjtBQUNILEtBTEQsTUFLSztBQUNEO0FBQ0E7QUFDQVgsTUFBQUEsQ0FBQyxDQUFDLE9BQUQsQ0FBRCxDQUFXWSxpQkFBWCxDQUE2QixLQUE3QixFQUhDLENBSUQ7O0FBQ0FQLE1BQUFBLENBQUMsR0FBR0wsQ0FBQyxDQUFDLGdCQUFELENBQUQsQ0FBb0JhLE1BQXhCLENBTEMsQ0FPRDs7QUFDQSxVQUFHUixDQUFDLElBQUksQ0FBUixFQUFVO0FBQ05MLFFBQUFBLENBQUMsQ0FBQyxXQUFELENBQUQsQ0FBZVUsTUFBZixHQUF3QkMsTUFBeEIsQ0FBK0IsNEJBQS9CLEVBRE0sQ0FHTjtBQUNILE9BSkQsTUFJSztBQUNEWCxRQUFBQSxDQUFDLENBQUMsV0FBRCxDQUFELENBQWVVLE1BQWYsR0FBd0JDLE1BQXhCLENBQStCLHdCQUFzQk4sQ0FBckQ7QUFDSDs7QUFDRCxhQUFPLEtBQVA7QUFDSDtBQUNKLEdBeENEO0FBeUNILENBNUNEIiwic291cmNlc0NvbnRlbnQiOlsiJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcblxuICAgIC8vINC+0LHRgNCw0LHQsNGC0YvQstCw0LXQvCDQvdCw0LbQsNGC0LjQtSDQvdCwINC60L3QvtC/0LrRg1xuICAgICQoXCIjc2VhcmNoQnV0dG9uXCIpLmNsaWNrKGZ1bmN0aW9uKCl7XG5cbiAgICAgICAgLy8g0L7Rh9C40YnQsNC10Lwg0L/QtdGA0LXQvNC10L3QvdGD0Y4sINCyINC60L7RgtC+0YDQvtC5INCx0YPQtNC10YIg0L3QsNGIINC/0L7QuNGB0LrQvtCy0YvQuSDQt9Cw0L/RgNC+0YFcbiAgICAgICAgdmFyIHRlcm0gPSBcIlwiO1xuXG4gICAgICAgIC8vINC4INC/0LXRgNC10LzQtdC90L3Rg9GOLCDQutC+0YLQvtGA0LDRjyDQvtGC0LLQtdGH0LDQtdGCINC30LAg0LrQvtC70LjRh9C10YHRgtCy0L4g0L3QsNC50LTQtdC90L3Ri9GFINGB0L7QstC/0LDQtNC10L3QuNC5XG4gICAgICAgIHZhciBuID0gXCIwXCI7XG5cbiAgICAgICAgLy8g0YPQsdC40YDQsNC10Lwg0LLRgdGOINC/0L7QtNGB0LLQtdGC0LrRgyDQuNC3INC/0YDQvtGI0LvQvtCz0L4g0L/QvtC40YHQutCwLCDQtdGB0LvQuCDQvtC90LAg0LHRi9C70LBcbiAgICAgICAgLy8gJCgnYm9keScpLnJlbW92ZUhpZGRlbkVsZW1zO1xuXG4gICAgICAgIC8vINGB0LrRgNGL0LLQsNC10Lwg0LHQu9C+0Log0YEg0YLQtdC60YHRgtC+0Lwg0L4g0LrQvtC70LjRh9C10YHRgtCy0LUg0L3QsNC50LTQtdC90L3Ri9GFINGA0LXQt9GD0LvRjNGC0LDRgtC+0LJcbiAgICAgICAgJCgncC5yZXN1bHRzJykuaGlkZSgpLmVtcHR5KCk7XG5cbiAgICAgICAgLy8g0YEg0L/QvtC80L7RidGM0Y4g0LzQsNCz0LjQuCBqUXVlcnkg0LHQtdGA0ZHQvCDRgtC10LrRgdGCINC40Lcg0YHRgtGA0L7QutC4INC/0L7QuNGB0LrQsCDQuCDQutC70LDQtNGR0Lwg0LXQs9C+INCyINC/0LXRgNC10LzQtdC90L3Rg9GOIHRlcm1cbiAgICAgICAgdGVybSA9ICQoJyNzZWFyY2hJbnB1dCcpLmF0dHIoJ3ZhbHVlJyk7XG5cbiAgICAgICAgLy8g0LXRgdC70Lgg0YHRgtGA0L7QutCwINC/0L7QuNGB0LrQsCDQv9GD0YHRgtCw0Y8g4oCUINCy0YvQstC+0LTQuNC8INGB0L7QvtCx0YnQtdC90LjQtVxuICAgICAgICBpZigkKCcjc2VhcmNoSW5wdXQnKS52YWwoKSA9PSBcIlwiKXtcbiAgICAgICAgICAgICQoXCJwLnJlc3VsdHNcIikuZmFkZUluKCkuYXBwZW5kKFwi0JLRiyDQvdC40YfQtdCz0L4g0L3QtSDQstCy0LXQu9C4IDooXCIpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgICAgICAvLyDQuNC90LDRh9C1LCDQtdGB0LvQuCDQsiDRgdGC0YDQvtC60LUg0L/QvtC40YHQutCwINGH0YLQvi3RgtC+INCx0YvQu9C+4oCmXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgLy8g0LIg0LHQu9C+0LrQtSBjb250ZW50LCDQs9C00LUg0YMg0L3QsNGBINC90LDRhdC+0LTQuNGC0YHRjyDQstC10YHRjCDRgtC10LrRgdGCLCDQv9C70LDQs9C40L3QvtC8INC/0L7QtNGB0LLQtdGH0LjQstCw0LXQvCDQstGB0LUg0L3QsNC50LTQtdC90L3Ri9C1INGB0L7QstC/0LDQtNC10L3QuNGPICjQtdGB0LvQuCDRgdC+0LLQv9Cw0LTQtdC90LjQuSDQvdC1INCx0YPQtNC10YIg4oCUINC90LUg0LHRg9C00LXRgiDQuCDQv9C+0LTRgdCy0LXRgtC60LgpXG4gICAgICAgICAgICAvLyAkKCd0YWJsZScpLmhpZ2hsaWdodCggdGVybSApO1xuICAgICAgICAgICAgJCgndGFibGUnKS5oaWdobGlnaHQkMSRjb2xvcigncmVkJyk7XG4gICAgICAgICAgICAvLyDQsdC10YDRkdC8INC60L7Qu9C40YfQtdGB0YLQstC+INGB0L7QstC/0LDQtNC10L3QuNC5XG4gICAgICAgICAgICBuID0gJChcInNwYW4uaGlnaGxpZ2h0XCIpLmxlbmd0aDtcblxuICAgICAgICAgICAgLy8g0LXRgdC70Lgg0YHQvtCy0L/QsNC00LXQvdC40Lkg0L3QtdGCIOKAlCDQsiDRgNCw0LfQtNC10LvQtSByZXN1bHRzINC/0LjRiNC10LwsINGH0YLQviDQvdC40YfQtdCz0L4g0L3QtSDQvdCw0YjQu9C4XG4gICAgICAgICAgICBpZihuID09IDApe1xuICAgICAgICAgICAgICAgICQoXCJwLnJlc3VsdHNcIikuZmFkZUluKCkuYXBwZW5kKFwi0J3QuNGH0LXQs9C+INGC0LDQutC+0LPQviDQsiDRgtC10LrRgdGC0LUg0L3QtdGCXCIpO1xuXG4gICAgICAgICAgICAgICAgLy8g0LjQvdCw0YfQtSDQsiDRgtC+0Lwg0LbQtSDRgNCw0LfQtNC10LvQtSDQv9C40YjQtdC8INGH0LjRgdC70L4g0YHQvtCy0L/QsNC00LXQvdC40LlcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICQoXCJwLnJlc3VsdHNcIikuZmFkZUluKCkuYXBwZW5kKCfQndCw0LnQtNC10L3QviDRgdC+0LLQv9Cw0LTQtdC90LjQuTonK24pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfSk7XG59KTtcbiJdLCJmaWxlIjoiLi9yZXNvdXJjZXMvanMvZmluZC5qcy5qcyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./resources/js/find.js\n");
/******/ })()
;