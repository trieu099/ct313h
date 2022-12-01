<template>
    <nav class="navbar">
      <a ref="/" class="navbar-brand">Ứng dụng Quản lý Thư Viện</a>
      <div class="mr-auto navbar-nav">
        <li class="nav-item">
          <router-link :to="{ name: 'library' }" class="nav-link">Thư Viện 722
            <i class="fas fa-address-book"></i>
          </router-link>
        </li>
      </div>
    </nav>
</template>
<style> 
.narbar{
  width: 1366px;
  margin: 0px;
}
nav{
  background-color: #6ECCAF;
   
}
.navbar-brand{
  color: #344d67;
}
.nav-link{
  color: #344d67;
}
</style>