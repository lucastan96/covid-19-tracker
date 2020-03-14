let lastRetrievedData;
let interval = 60 * 1000;
let selectedCountryId;
let ireland, uk, malaysia, singapore;

function getData() {
    $.get({
        url: "api/api.php?r=get-data",
        cache: false
    })
        .done(function (data, statusText, xhr) {
            if (lastRetrievedData) {
                selectedCountryId = $("#select-country").val();
            }
            $("#select-country").empty();
            jQuery.each(data, function (i, val) {
                $('#select-country').append($('<option/>', {
                    value: i,
                    text: data[i].country
                }));
                if (data[i].country == "Ireland") {
                    ireland = i;
                } else if (data[i].country == "UK") {
                    uk = i;
                } else if (data[i].country == "Malaysia") {
                    malaysia = i;
                } else if (data[i].country == "Singapore") {
                    singapore = i;
                }
                if (!lastRetrievedData) {
                    selectedCountryId = ireland;
                }
            });
            $("#select-country").val(selectedCountryId);
            lastRetrievedData = data;
            showCountry();
            $("#last-updated").text("Updated: " + new Date().toLocaleString());
        })
        .fail(function (xhr, statusText, error) {

        });
}

function showCountry(selectedCountry) {
    let id;
    if (selectedCountry) {
        if (selectedCountry == "ireland") {
            id = ireland;
        } else if (selectedCountry == "uk") {
            id = uk;
        } else if (selectedCountry == "malaysia") {
            id = malaysia;
        } else if (selectedCountry == "singapore") {
            id = singapore;
        }
    } else {
        id = $("#select-country").val();
    }

    $("#select-country").val(id);
    $("#cases").text(lastRetrievedData[id].cases.toLocaleString());
    $("#cases-today").text(lastRetrievedData[id].todayCases.toLocaleString());
    $("#deaths").text(lastRetrievedData[id].deaths.toLocaleString());
    $("#deaths-today").text(lastRetrievedData[id].todayDeaths.toLocaleString());
    $("#recovered").text(lastRetrievedData[id].recovered.toLocaleString());
    $("#critical").text(lastRetrievedData[id].critical.toLocaleString());
}

$(document).ready(function () {
    getData();
    setInterval(function () {
        getData();
    }, interval);
});