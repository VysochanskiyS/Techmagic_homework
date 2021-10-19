var block = document.getElementById('block');
function getData() {
    return fetch('https://jsonplaceholder.typicode.com/posts');
}
getData().then(function (response) {
    return response.json();
})
    .then(function (json) {
    json.forEach(function (el) {
        block.innerHTML += "<div class='el'>" + el.title + " </div>";
    });
});
var array = [
    { id: 0, name: "Vasya" },
    { id: 1, name: "Sergiy" },
    { id: 2, name: "Galuna" },
    { id: 3, name: "Ivanka" },
    { id: 4, name: "Andriana" },
    { id: 5, name: "Maks" },
];
function updateObjectInArray(initialArray, keyToFind, keyValueToFind, patch) {
    var arr = JSON.parse(JSON.stringify(initialArray));
    initialArray.map(function (el, index) {
        el[keyToFind] == keyValueToFind ? (el.id = patch.id, el.name = patch.name) : '';
    });
    console.log(initialArray);
    return initialArray;
}
var patch = {
    name: 'Vysochanskiy',
    id: 20
};
console.log(updateObjectInArray(array, "name", "Maks", patch));
