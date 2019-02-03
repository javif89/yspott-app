<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <router-link class="navbar-brand" to="/miami">Yspott</router-link>
      <div class="collapse navbar-collapse mr-auto" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <a style="cursor: pointer;" data-toggle="modal" data-target="#add-spot-modal" class="nav-link">List My Spot</a>
          </li>
        </ul>
        <ul class="navbar-nav">
          <li class="nav-item active">
            <a class="nav-link" href="#">Park With Us <span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item"><a href="" class="nav-link">Be a Host</a></li>
          <li class="nav-item">
            <a class="nav-link" href="#">Login/Sign Up</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Learn
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <a class="dropdown-item" href="#">Action</a>
              <a class="dropdown-item" href="#">Another action</a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="#">Something else here</a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
    <div id="main-container" class="container-fluid">
      <router-view></router-view>
    </div>
  </div>
</template>

<style lang="scss">
  @import url("https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css");
  @import url("https://use.fontawesome.com/releases/v5.7.1/css/all.css");
  @import url("https://fonts.googleapis.com/css?family=Encode+Sans:100,100italic,300,300italic,200,200italic,600,600italic,400,400italic,900,900italic%7CExo:300,300italic,400,400italic");
  #app {
    font-family: 'Encode Sans';
    font-weight: 100;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }

  .btn-dark:hover {
    background-color: #FFBA49;
    color: #FFFFFF;
  }

  .btn-dark {
    background-color: #303B45;
    border: none;
  }
</style>
