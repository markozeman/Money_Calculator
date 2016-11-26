document.addEventListener("DOMContentLoaded", main);

var submit;
var uporabniki = [];
var trenutni_uporabnik;


class Uporabnik {
    constructor(uporabnisko_ime, geslo) {
        this.uporabnisko_ime = uporabnisko_ime;
        this.geslo = geslo;
        this.bancno_stanje = new Stanje("banka");
        this.denarnica_stanje = new Stanje("denarnica");
        this.cilji = [];
        this.transakcije = [];
    }
    
    setUporabniskoIme (novo_up_ime) {
        this.uporabnisko_ime = novo_up_ime;
    }
    
    setGeslo (novo_geslo) {
        this.geslo = novo_geslo;
    }
    
    addCilj (nov_cilj) {
        this.cilji.push(nov_cilj);
    }
    
    getOpisCiljev () {
        var opis_ciljev = [];
        for (var i=0; i<this.cilji.length; i++) {
            opis_ciljev.push(this.cilji[i].opis);
        }
        return opis_ciljev;
    }
    
    findCilj (opis_cilja) {
        for (var i=0; i<this.cilji.length; i++) {
            if (this.cilji[i].opis == opis_cilja) {
                return this.cilji[i];
            }
        }
        return "Cilj s takim opisom ne obstaja";
    }
    
    addTranskacija (nova_transakcija) {
        this.transakcije.push(nova_transakcija);
    }
    
    executeTransakcija (transakcija) {
        var znesek = parseInt(transakcija.znesek);
        if (transakcija.smer == "polog") {
            this.denarnica_stanje.stanje -= znesek;
            this.bancno_stanje.stanje += znesek;
        }
        else if (transakcija.smer == "dvig") {
            this.bancno_stanje.stanje -= znesek;
            this.denarnica_stanje.stanje += znesek;
        }
    }
    
    executeIzdatekPrejemek (izdatek_prejemek) {
        var znesek = parseInt(izdatek_prejemek.znesek);
        var banka_denarnica = izdatek_prejemek.banka_denarnica;
        
        if (izdatek_prejemek.tip == "izdatek") {
            if (banka_denarnica == "denarnica") {
                this.denarnica_stanje.stanje -= znesek;
            }
            else if (banka_denarnica == "banka") {
                this.bancno_stanje.stanje -= znesek;
            }
        }
        else if (izdatek_prejemek.tip == "prejemek") {
            if (banka_denarnica == "denarnica") {
                this.denarnica_stanje.stanje += znesek;
            }
            else if (banka_denarnica == "banka") {
                this.bancno_stanje.stanje += znesek;
            }
        }
    }
}


class Stanje {
    constructor(tip) {
        this.tip = tip;
        this.stanje = 0;
        this.izdatki = [];
        this.prejemki = [];
    }
    
    setZacetnoStanje (zacetno_stanje) {
        this.stanje = zacetno_stanje;
    }
    
    addIzdatekPrejemek (nov_izdatek_prejemek) {
        if (nov_izdatek_prejemek.tip == "izdatek") {
            this.izdatki.push(nov_izdatek_prejemek);
        }
        else if (nov_izdatek_prejemek.tip == "prejemek") {
            this.prejemki.push(nov_izdatek_prejemek);
        }
    }
}


class Cilj {
    constructor(opis, vrednost, do_datuma) {
        this.opis = opis;
        this.vrednost = vrednost;
        this.trenutno_privarcevano = 0;
        this.od_datuma = new Date();
        this.do_datuma = do_datuma;
    }
    
    povecajTrenutnoPrivarcevano (znesek) {
        this.trenutno_privarcevano += znesek;
    }
    
    stanjeVarcevanja() {
        return (this.trenutno_privarcevano / this.vrednost);
    }
    
    steviloDniMedDatumoma (datum_1, datum_2) {
        var timeDiff = Math.abs(datum_1.getTime() - datum_2.getTime());
        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
        return diffDays;
    }
    
    casovnoStanje() {
        var danes = new Date();
        var skupno = this.steviloDniMedDatumoma(this.od_datuma, this.do_datuma);
        var do_danes = this.steviloDniMedDatumoma(danes, this.do_datuma);
        return (do_danes / skupno);
    }
}


class IzdatekPrejemek {
    constructor(tip, opis, znesek, kategorija, banka_denarnica) {
        this.tip = tip;
        this.opis = opis;
        this.znesek = znesek;
        this.kategorija = kategorija;
        this.banka_denarnica = banka_denarnica;
    }
}


class Transakcija {
    constructor(opis, znesek, smer) {
        this.opis = opis;
        this.znesek = znesek;
        this.smer = smer;   // polog/dvig
    }
}


/*
var up_1 = new Uporabnik("marko", "geslo123");
up_1.bancno_stanje.setZacetnoStanje(1500);
up_1.bancno_stanje.addIzdatek(100);
console.log(up_1.bancno_stanje);
*/




function main() {
    // window.addEventListener("beforeunload", onCheckLeave);
    /*
    var logo_picture = document.getElementsByClassName("logo")[0];
    if (profile_picture != null) {
        logo_picture.src = profile_picture.src;    
    }
    */
    
    
    
    
    
    
    
}




trenutni_uporabnik = new Uporabnik("marko", "geslo123");



function registration() {
    var inputs = document.getElementById("registration_form");
    
    var username = inputs[0];
    var password = inputs[1];
    var password_2 = inputs[2];
    
    var checkbox = document.getElementById("registration_form").elements["captcha"].checked;
    if (!checkbox) {
        alert ("Označite, da niste robot.");
        return;
    }
    
    if (submit.value == "Vpis") {
        if (username.value.length == 0) {
            alert("Vnesite uporabniško ime.");
            return;
        }
        if (username.value.length < 6) {
            alert("Uporabniško ime mora biti dolgo vsaj 6 znakov.");
            return;
        }
        
        // preveri, če je pravo uporabniško ime in pravilno geslo na vsaj enem od polj
        var user = find_user_by_username(username.value);
        if (typeof(user) !== 'string') {   // obstaja tak username
            if (user.geslo == password.value || user.geslo == password_2.value) {
                // TODO
                // vpiši uporabnika
                console.log("VPIS");
                window.location.href = "index.html";
            }   
            else {
                alert("Geslo je napačno.");
            }
        }
        else {
            alert("Uporabniško ime ne obstaja.");
        }
    }
    else if (submit.value == "Registracija") {
        if (username.value.length == 0 || password.value.length == 0 || password_2.value.length == 0) {
            alert("Izpolnite vsa polja.");
            return;
        }
        
        if (username.value.length < 6) {
            alert("Uporabniško ime mora biti dolgo vsaj 6 znakov.");
            return;
        }
        if (password.value != password_2.value) {
            alert("Gesli se ne ujemata.");
            return;
        }
        
        // preveri če tako uporabniško ime še ne obstaja, sicer pa registriraj novo osebo in ga dodaj v seznam uporabnikov
        var ze_obstaja = false;
        for (var i=0; i<uporabniki.length; i++) {
            if (username.value == uporabniki[i].uporabnisko_ime) {
                alert("To uporabniško ime že obstaja.");
                ze_obstaja = true;
            }
        }
        if(!ze_obstaja) {
            var uporabnik = new Uporabnik(username.value, password.value);
            trenutni_uporabnik = uporabnik;
            uporabniki.push(uporabnik);
        }
        
        console.log(uporabniki);
    }
    
    
    return false;
}


function get_visual_minus() {
    
    return false;
}


function get_visual_plus() {
    
    return false;
}


function get_data() {

    
    return false;
}


function add_or_take_money() {
    // preveri kateri dropdown je izbran
    var dropdown = document.getElementsByClassName("select_dropdown")[0];
    var dropdown_string = dropdown.options[dropdown.selectedIndex].value;
    
    var inputs = document.getElementById("add_data");
    var opis = inputs[0].value;
    var znesek = inputs[1].value;
    var kategorija = inputs[2].value;
    
    console.log(opis);
    console.log(znesek);
    console.log(kategorija);

    if (kategorija == "dvig" || kategorija == "polog") {
        var transakcija = new Transakcija(opis, znesek, kategorija);
        trenutni_uporabnik.addTranskacija(transakcija);
        trenutni_uporabnik.executeTransakcija(transakcija);
    }
    else {
        var izdatek_prejemek; 
        if (submit.value == "Dodaj") {
            if (dropdown_string == "wallet") {
                izdatek_prejemek = new IzdatekPrejemek("prejemek", opis, znesek, kategorija, "denarnica");
                trenutni_uporabnik.denarnica_stanje.addIzdatekPrejemek(izdatek_prejemek);
            }
            else if (dropdown_string == "bank") {
                izdatek_prejemek = new IzdatekPrejemek("prejemek", opis, znesek, kategorija, "banka");
                trenutni_uporabnik.bancno_stanje.addIzdatekPrejemek(izdatek_prejemek);
            }
        }
        else if (submit.value == "Odvzemi") {
            if (dropdown_string == "wallet") {
                izdatek_prejemek = new IzdatekPrejemek("izdatek", opis, znesek, kategorija, "denarnica");
                trenutni_uporabnik.denarnica_stanje.addIzdatekPrejemek(izdatek_prejemek);
            }
            else if (dropdown_string == "bank") {
                izdatek_prejemek = new IzdatekPrejemek("izdatek", opis, znesek, kategorija, "banka");
                trenutni_uporabnik.bancno_stanje.addIzdatekPrejemek(izdatek_prejemek);
            }
        }
        
        trenutni_uporabnik.executeIzdatekPrejemek(izdatek_prejemek);
    }
   
    
    console.log(trenutni_uporabnik);

    
    return false;
}


function add_goal() {
    var inputs = document.getElementById("add_goal");
    var opis = inputs[0].value;
    var vrednost = parseInt(inputs[1].value);
    var do_datum = inputs[2].valueAsDate;
    
    console.log(opis);
    console.log(vrednost);
    console.log(do_datum);
    
    
    var cilj = new Cilj(opis, vrednost, do_datum);
    trenutni_uporabnik.addCilj(cilj);
    
    console.log(trenutni_uporabnik);
    
    
    return false;
}


function add_to_goal() {
    var inputs = document.getElementById("add_to_goal");
    var vrednost = parseInt(inputs[0].value);
    var wallet_bank = inputs[1].value;
    var goal = inputs[2].value;
    
    if (vrednost.length == 0) {
        alert("Vnesite vrednost");
        return;
    }
    
    console.log(vrednost);
    console.log(wallet_bank);
    console.log(goal);
    
    
    // TODO
    // dodaj k izbranemu cilju
    var cilj = trenutni_uporabnik.findCilj(goal);
    cilj.povecajTrenutnoPrivarcevano(vrednost);
    // ali se poveča tudi pri uporabnikovih ciljih ???
    
    
    // TODO
    // odvzemi denar iz denarnice ali banke
    var transakcija = new Transakcija("Dodajanje denarja cilju" + goal, vrednost, "polog");
    trenutni_uporabnik.addTranskacija(transakcija);
    trenutni_uporabnik.executeTransakcija(transakcija);
    
    
    console.log(trenutni_uporabnik);
    
    
    return false;
}







function showGoal(elem){
    if(elem.value == "new_goal") { 
        document.getElementsByClassName("new_goals")[0].style.display = "block";
        document.getElementsByClassName("add_data")[0].style.display = "none";
        document.getElementsByClassName("add_to_goal")[0].style.display = "none";
    }
    else if(elem.value == "goal_add_money") { 
        document.getElementsByClassName("add_to_goal")[0].style.display = "block";
        document.getElementsByClassName("add_data")[0].style.display = "none";
        document.getElementsByClassName("new_goals")[0].style.display = "none";
    }
    else {
        document.getElementsByClassName("add_data")[0].style.display = "block";
        document.getElementsByClassName("new_goals")[0].style.display = "none";
        document.getElementsByClassName("add_to_goal")[0].style.display = "none";
    }
}


function showGoal_2(elem){
    if(elem.value == "goals") {
        document.getElementsByClassName("goal_results")[0].style.display = "block";
        document.getElementsByClassName("not_goal_results")[0].style.display = "none";
        document.getElementsByClassName("result_set")[0].style.display = "none";
    }
    else {
        document.getElementsByClassName("not_goal_results")[0].style.display = "block";
        document.getElementsByClassName("result_set")[0].style.display = "block";
        document.getElementsByClassName("goal_results")[0].style.display = "none";
    }
}


function Clicked (button) {
    submit = button ;
}


function find_user_by_username (username) {
    for (var i=0; i<uporabniki.length; i++) {
        if (uporabniki[i].uporabnisko_ime == username) {
            return uporabniki[i];
        }
    }
    return "Ni uporabnika s takim uporabniškim imenom.";
}


function index_of_current_user () {
    for (var i=0; i<uporabniki.length; i++) {
        if (uporabniki[i] == trenutni_uporabnik) {
            return i;
        }
    }
}





/*
function onCheckLeave (ev) {
    var inputs = document.querySelectorAll("input[type='text'], input[type='password']");
    
    for (var i=0; i<inputs.length; i++) {
        if (inputs[i].value != "") {
            ev.returnValue = "pozor";
            return "pozor";
        }
    }
}
*/