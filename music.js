//$('.playlst').append("<ul></ul>");
const musicInfo = [];
let $item
function addSongFromField(event) {
  event.preventDefault();

  const info = $('#musicField').eq(0).val();

  musicInfo.push(info);
  renderList();
  $('#musicField').eq(0).val('');
}

$('#addButton').click(addSongFromField);
$('#musicField').keyup(function(event) {
  if (event.which == 13) { // User presses Enter
    addSongFromField(event);
  }
});

function renderList() {
  const $list = $('.info').eq(0);

  $list.empty();

  for (const info of musicInfo) {
    $item = info;
    let $listItmes = $('<li class="list-group-item">').text(info);

    $list.append($listItmes)
  }
}
//$item = musicInfo;
$('#getPlaylistBtn').click(function (event) {

  $.ajax({
        url: `https://itunes.apple.com/search?term=${$item}&entity=song&attribute=allArtistTerm&limit=10&explicit=no`,
        crossDomain: true,
        dataType: 'jsonp',
        // data: {
        //   term: term,
        //   entity: 'song',
        //   limit: 24,
        //   explicit: 'Yes'
        // },
        method: 'GET',

        success:(data) => {
          console.log( data);
          data.results.map((item, index) => {
            let firstname ="";
            let lastname ="";
            let artwork ="";
            let artistIfo="";
            console.log(item.artistName);
            console.log(item.artworkUrl100);
            firstname= item.artistName;
            artwork = item.artworkUrl100;
            artistIfo = item.collectionViewUrl;
            $("ul").append(`<li>${firstname}</li>`);
            $("ul").append(`<li> <a href=${artistIfo}><img src=${artwork}></a></li>`);


          })

        },
        error: (e) => {
          console.log(e);
        }
  });
  // TODO: Display a list of music.
  // You may use anything from musicInfo.
  console.log('Testing Music Call');
});