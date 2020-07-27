<template>
  <div id="app" class="flex flex-col h-screen justify-between">
    <Navbar />
    <SearchPage />
    <Footer />
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SearchPage from './components/SearchPage'

export default {
  name: 'App',
  components: {
    Navbar,
    SearchPage,
    Footer
  }
}
</script>
