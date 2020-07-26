<template>
  <div id="app">
    <Navbar />
    <SearchPage />
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import SearchPage from './components/SearchPage'

export default {
  name: 'App',
  components: {
    Navbar,
    SearchPage
  }
}
</script>
