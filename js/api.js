var base_url = "https://www.thesportsdb.com";
var base_url2 = "https://private-044be-dicodingfootball.apiary-mock.com";

// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);

    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}
// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}
// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}
// Blok kode untuk melakukan request data json
//Request data Leagues
function getLeagues() {
    if ("caches" in window) {
        caches.match(base_url + "/api/v1/json/1/lookupleague.php?id=" + 4346).then(function (response) {
          if (response) {
            response.json().then(function (data) {
              let leaguesHTML = "";
              data.leagues.forEach(function (league) {
                leaguesHTML += `
                        <div class="card">
                            <div class="card-image waves-effect waves-block waves-light">
                              <img src="${league.strFanart1}" />
                            </div>
                            <div class="card-content">
                                <span class="card-title truncate">${league.strLeague}</span>
                                <p>${league.strWebsite}</p>
                                <p>${league.strDescriptionEN}</p>
                            </div>
                        </div>
                        `;
              });
              // Sisipkan komponen card ke dalam elemen dengan id #content
                document.getElementById("leagues").innerHTML = leaguesHTML;
                })
          }
        });
      }


  fetch(base_url + "/api/v1/json/1/lookupleague.php?id=" + 4346)
    .then(status)
    .then(json)
    .then(function(data) {
      // Objek/array JavaScript dari response.json() masuk lewat data.
      
      // Menyusun komponen card team secara dinamis
      var leaguesHTML = "";
      data.leagues.forEach(function(league) {
        leaguesHTML += `
                  <div class="card">
                      <div class="card-image waves-effect waves-block waves-light">
                        <img src="${league.strFanart1}" />
                      </div>
                      <div class="card-content">
                        <span class="card-title truncate">${league.strLeague}</span>
                        <p>${league.strWebsite}</p>
                        <p>${league.strDescriptionEN}</p>
                      </div>
                  </div>
            `;
      });
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("leagues").innerHTML = leaguesHTML;
    })
    .catch(error);
}

//Request data teams
function getTeams() {
  if ("caches" in window) {
      caches.match(base_url + "/api/v1/json/1/lookup_all_teams.php?id=" + 4328).then(function (response) {
        if (response) {
          response.json().then(function (data) {
            let teamsHTML = "";
            data.teams.forEach(function (team) {
              teamsHTML += `
                      <div class="card">
                        <a href="./team.html?id=${team.idTeam}">
                          <div class="card-image waves-effect waves-block waves-light">
                            <img src="${team.strTeamBadge}" />
                          </div>
                        </a>
                          <div class="card-content">
                              <span class="card-title truncate">${team.strTeam}</span>
                              
                              <p>${team.strDescriptionEN}</p>
                          </div>
                      </div>
                      `;
            });
            // Sisipkan komponen card ke dalam elemen dengan id #content
              document.getElementById("teams").innerHTML = teamsHTML;
              })
        }
      });
    }


fetch(base_url + "/api/v1/json/1/lookup_all_teams.php?id=" + 4328)
  .then(status)
  .then(json)
  .then(function(data) {
    // Objek/array JavaScript dari response.json() masuk lewat data.
    
    // Menyusun komponen card team secara dinamis
    var teamsHTML = "";
    data.teams.forEach(function(team) {
      teamsHTML += `
                  <div class="card">
                    <a href="./team.html?id=${team.idTeam}">
                      <div class="card-image waves-effect waves-block waves-light">
                        <img src="${team.strTeamBadge}" />
                      </div>
                    </a>
                    <div class="card-content">
                      <span class="card-title truncate">${team.strTeam}</span>
                      
                      <p>${team.strDescriptionEN}</p>
                    </div>
                  </div>
                  `;
    });
    // Sisipkan komponen card ke dalam elemen dengan id #content
    document.getElementById("teams").innerHTML = teamsHTML;
  })
  .catch(error);
}

//Fungsi untuk menambah detail Team
function getTeamById(){
  return new Promise(function(resolve, reject) {
    // Ambil nilai query parameter (?id=)
    // YANG INI HARUS PAKE VAR
    var urlParams = new URLSearchParams(window.location.search);
    let idParam = urlParams.get("idTeam");
  
    if ("caches" in window) {
      caches.match(base_url + "/team/" + idParam).then(function (response) {
        if (response) {
          response.json().then(function (data) {
            let teamHTML = `
              <div class="card">
                <div class="card-image waves-effect waves-block waves-light">
                  <img src="${data.teams.cover}" />
                </div>
                <div class="card-content">
                  <span class="card-title">${data.teams.post_title}</span>
                  ${snarkdown(data.teams.post_content)}
                </div>
              </div>
            `;
            // Sisipkan komponen card ke dalam elemen dengan id #content
            document.getElementById("body-content").innerHTML = teamHTML;
            // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
            resolve(data);
          });
        }
      });
    }
  
    fetch(base_url + "/team/" + idParam)
      .then(status)
      .then(json)
      .then(function (data) {
        // Objek JavaScript dari response.json() masuk lewat variabel data.
        console.log(data);
        // Menyusun komponen card artikel secara dinamis
        var teamHTML = `
            <div class="card">
              <div class="card-image waves-effect waves-block waves-light">
                <img src="${data.teams.cover}" />
              </div>
              <div class="card-content">
                <span class="card-title">${data.teams.post_title}</span>
                ${snarkdown(data.teams.post_content)}
              </div>
            </div>
          `;
        // Sisipkan komponen card ke dalam elemen dengan id #content
        document.getElementById("body-content").innerHTML = articleHTML;
        // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
        resolve(data);
        });
      });
  }
 

//Request data players
function getPlayers() {
  if ("caches" in window) {
      caches.match(base_url2 + "/api/v1/json/1/lookup_all_players.php?id=" + 133604).then(function (response) {
        if (response) {
          response.json().then(function (data) {
            let playersHTML = "";
            data.player.forEach(function (player) {
              playersHTML += `
                      <div class="card">
                        <a href="./player.html?id=${player.idTeam}">
                          <div class="card-image waves-effect waves-block waves-light">
                            <img src="${player.strThumb}" />
                          </div>
                        </a>
                          <div class="card-content">
                              <span class="card-title truncate">${player.strPlayer}</span>
                              
                              <p>${player.strDescriptionEN}</p>
                          </div>
                      </div>
                      `;
            });
            // Sisipkan komponen card ke dalam elemen dengan id #content
              document.getElementById("players").innerHTML = playersHTML;
              })
        }
      });
    }


fetch(base_url2 + "/api/v1/json/1/lookup_all_players.php?id=" + 133604)
  .then(status)
  .then(json)
  .then(function(data) {
    // Objek/array JavaScript dari response.json() masuk lewat data.
    
    // Menyusun komponen card team secara dinamis
    var playersHTML = "";
    data.player.forEach(function(player) {
      playersHTML += `
                  <div class="card">
                    <a href="./player.html?id=${player.idTeam}">
                      <div class="card-image waves-effect waves-block waves-light">
                        <img src="${player.strThumb}" />
                      </div>
                    </a>
                    <div class="card-content">
                      <span class="card-title truncate">${player.strPlayer}</span>
                      
                      <p>${player.strDescriptionEN}</p>
                    </div>
                  </div>
          `;
    });
    // Sisipkan komponen card ke dalam elemen dengan id #content
    document.getElementById("players").innerHTML = playersHTML;
  })
  .catch(error);
}

//fungsi getAll() untuk mengambil seluruh data team di Indexed DB
function getSavedTeams() {
  getAll().then(function(teams) {
    console.log(teams);
    // Menyusun komponen card team secara dinamis
    var teamsHTML = "";
    teams.forEach(function(team) {
      var description = teams.post_content.substring(0,100);
      teamsHTML += `
                  <div class="card">
                    <a href="./team.html?id=${team.ID}&saved=true">
                      <div class="card-image waves-effect waves-block waves-light">
                        <img src="${team.cover}" />
                      </div>
                    </a>
                    <div class="card-content">
                      <span class="card-title truncate">${team.post_title}</span>
                      <p>${description}</p>
                    </div>
                  </div>
                `;
    });
    // Sisipkan komponen card ke dalam elemen dengan id #body-content
    document.getElementById("body-content").innerHTML = teamsHTML;
  });
}

// pemanggilan fungsi getSavedArticleById yang mengambil data dari database dan menampilkannya di halaman detail
function getSavedTeamById() {
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("idTeam");
  
  getById(idParam).then(function(team) {
    teamHTML = '';
    var teamHTML = `
    <div class="card">
      <div class="card-image waves-effect waves-block waves-light">
        <img src="${team.cover}" />
      </div>
      <div class="card-content">
        <span class="card-title">${team.post_title}</span>
        ${snarkdown(team.post_content)}
      </div>
    </div>
  `;
    // Sisipkan komponen card ke dalam elemen dengan id #content
    document.getElementById("body-content").innerHTML = teamHTML;
  });
}

//Fungsi untuk menambah detail Player
function getPlayerById(){
  return new Promise(function(resolve, reject) {
    // Ambil nilai query parameter (?id=)
    // YANG INI HARUS PAKE VAR
    var urlParams = new URLSearchParams(window.location.search);
    let idParam = urlParams.get("idTeam");
  
    if ("caches" in window) {
      caches.match(base_url2 + "/player/" + idParam).then(function (response) {
        if (response) {
          response.json().then(function (data) {
            let playerHTML = `
              <div class="card">
                <div class="card-image waves-effect waves-block waves-light">
                  <img src="${data.player.cover}" />
                </div>
                <div class="card-content">
                  <span class="card-title">${data.player.post_title}</span>
                  ${snarkdown(data.player.post_content)}
                </div>
              </div>
            `;
            // Sisipkan komponen card ke dalam elemen dengan id #content
            document.getElementById("body-content").innerHTML = playerHTML;
            // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
            resolve(data);
          });
        }
      });
    }
  
    fetch(base_url2 + "/player/" + idParam)
      .then(status)
      .then(json)
      .then(function (data) {
        // Objek JavaScript dari response.json() masuk lewat variabel data.
        console.log(data);
        // Menyusun komponen card artikel secara dinamis
        var playerHTML = `
            <div class="card">
              <div class="card-image waves-effect waves-block waves-light">
                <img src="${data.player.cover}" />
              </div>
              <div class="card-content">
                <span class="card-title">${data.player.post_title}</span>
                ${snarkdown(data.player.post_content)}
              </div>
            </div>
          `;
        // Sisipkan komponen card ke dalam elemen dengan id #content
        document.getElementById("body-content").innerHTML = playerHTML;
        // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
        resolve(data);
        });
      });
  }