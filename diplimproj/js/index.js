$(document).ready(function () {

    //Таблица констант
    const g = 9.8;
    const n1 = 0.95; //КПД реечной передачи
    const n2 = 0.4; //КПД винтовой передачи скольжения
    const n3 = 0.99; //КПД подшипника качения
    const n4 = 0.98; //КПД подшипника скольжениия
    const n5 = 0.98; //КПД направляющей
    const n = 0.2857; //Общее КПД

    const HB = 180; //Сталь 45H
    const k_d = 1.12; //Для прямозубой
    const S_H = 1.1; //Коэффициент безопасности
    const S_F = 1.75; //Коэффициент безопасности

    const k_HL = 1; //коэффициент долговечности, учитывающий срок службы
    const k_HC = 1; //коэффициент, учитывающий реверсивность нагрузки
    const k_HB = 1.01; //коэффициент, учитывающий неравномерность нагрузки по ширине зуба

    const k_FC = 0.75; //коэффициент, учитывающий реверсивность нагрузки (реверсивная нагрузка),
    const k_FL = 1; //коэффициент долговечности
    const k_m = 6.6; //Для прямозубых колес

    const psi_bd = 0.2; //коэффициент ширины зубчатого венца
    const E1 = 2 * Math.pow(10, 5); //модуль упругости первого рода материала рейки
    const E2 = 2 * Math.pow(10, 5); //модуль упругости первого рода материала шестерни
    var F;
    var F_1;

    //винтовая передача
    const K = 1; //Число заходов резьбы
    const K_p = 0.8; //коэффициент, зависящий от типа резьбы
    const y = 2.4; // коэффициент высоты гайки
    const q_vint = 5; //МПа допускаемое давление между рабочими поверхностями резьбы винта и гайки



    //Выбор электродвиигателя
    function elEngine() {

        //Значения из инпута
        var m = $("#massa").val();
        var v = $("#velocity").val();
        var d = $("#diameter").val();
        var h = $("#linearMotion").val();

        //Усилия для трех вариантов удержания
        var N1 = m * g * 0.6225;
        var N2 = ( m * g ) / 1.73;
        var N3 = ( m * g ) / 1.4;
        var N = Math.max(N1, N2, N3);

        //Расчет мощности
        F = 4 * N * 0.866;
        F_1 = 2 * N * 0.866;
        var P = F * v * 1.1 / n;

        $("#power").append(P.toFixed(0) + " " + "Вт");
    }

    //Расчет реечной передачии
    function calculate(){

        //Значения из инпута
        var m = $("#massa").val();
        var v = $("#velocity").val();
        var d = $("#diameter").val();
        var h = $("#linearMotion").val();

        //Распределение передаточных отношениий
        var n = 3000; //Номинальная частота вращения
        var U = Math.PI * n / 30 / v; //Общее передаточное отношение
        var U1 = 1 / d; //Передаточное отношениеи схвата
        var U2 = 1570; //Передаточное отношение винт-гайки
        var U3 = U / U1 / U2; //Передаточное отношениеи реечного преобразователя

        //Расчет реечной передачи
        var d1_2 = 2 * 10 * 10 * 10 * U3; //Делительный диаметр шестерни
        var Si_hlimb = 2 * HB +70; //Предел контактной выносливости поверхностей зубьев
        var Si_H = Si_hlimb / S_H * k_HC * k_HL; //допускаемое контактное напряжение
        var E_pr = 2 * E1 * E2 / (E1 + E2); //приведенный модуль упругости материалов шестерни и рейки
        var T3 = F_1 * d;
        var d1_1 = 1.2 * k_d * Math.cbrt((T3 * Math.pow(10, 3) * E_pr * k_HB) / (psi_bd * Math.pow(Si_H, 2))); //делительный диаметр шестерни из условия контактной прочности зубьев
        var d1 = Math.ceil(Math.max(d1_1, d1_2)); //Делительный диаметр шестерни после сравнениея

        var F2 = 2 * T3 * 10 * 10 * 10 / d1; //Осевая сила, действующая на рейку
        var Si_flimb = 1.8 * HB; //предел изгибной выносливости поверхностей зубьев
        var Si_F = Si_flimb / S_F * k_FL * k_FC;
        var m_modul = Math.ceil(k_m * F2 / psi_bd / d1 / Si_F); //Модуль зубьев
        var z1 = d1 / m_modul; //Число зубьев шестерни
        var d1_a = d1 + 2 * m_modul; //Диаметр окружности вершин зубьев
        var d1_f = d1 - 2.5 * m_modul; //Диаметр окружности впадин зубьев
        var S1 = 0.5 * Math.PI * m_modul; //Толщина зуба по средней прямой и толщина зуба шестерни по делительной окружности
        var P1 = Math.PI * m_modul; //Нормальный шаг зубьев
        var alpha = Math.asin(h / d / 1000).toFixed(4); //Угол поворота колеса
        var H1 = Math.round(d1 * alpha / 2); //перемещение рейки
        var W1 = v / d; //Угловая скорость шестерни
        var V1 = W1 * d1 / 2000; //скорость линейного перемещения рейки
        var L1_min = H1 + 3 * P1;  //Минимальная длинна нарезанной части рейки
        var z1_min = Math.round( L1_min / P1 + 0.5); //Минимальное число зубьев
        var b1 = Math.ceil(psi_bd * d1); //Ширина зубчатого венца рейки
        var b2 = Math.ceil(b1 + 0.6 * Math.sqrt(b1)); //Ширина шестерни

        //Добавление переменных в таблицу
        $("#val1").append(d1);
        $("#val2").append(m_modul);
        $("#val3").append(alpha);
        $("#val4").append(z1_min);
        $("#val5").append(H1);

        //Расчет винтовой передачи скольжения
        var P = Math.round(2 * 10 * 10 * 10 * Math.PI / U2 / K); //Шаг резьбы
        var fi = (2 * Math.PI * h / P / K).toFixed(2); //Угол поворота винта
        var v_vinta = 0.002; //Линейная скорость гайки (рандомное взято)
        var w = (2 * Math.PI * 10 * 10 * 10 * v_vinta / P / K).toFixed(2); //Угловая скорость винта

        //Проектный расчет винта
        var F_a = Math.round(2 * F2); //Осевая сила, действующая на гайку
        var F_asum = Math.round(1.5 * F_a); // суммарная осевая сила
        var d2 = K_p * Math.sqrt(F_asum / y / q_vint ); //Средний диаметр

        $("#val6").append(fi);
        $("#val7").append(w);
        $("#val8").append(F_a);
        $("#val9").append(F_asum);
        $("#val10").append(P);

        console.log(d2);
    }

    // Кнопка расчет мощности двигателя
    $("#calculateEng").on('click', function () {
        if ($("#massa").val() && $("#velocity").val() && $("#diameter").val() && $("#linearMotion").val()){
            elEngine();
            $("#fadetoggler").fadeIn();
            $("#calculateEng").off('click');
            $("#calculate").removeClass('d-none');
            $(".form-control").removeClass('border-danger');
        } else {
            $(".form-control").addClass('border-danger');
        }

    });

    // Кнопка расчет
    $("#calculate").on('click', function () {
        calculate();
        $("#calculate").off('click');
    });

    $("#reset").click(function () {
        location.reload();
    })






});


