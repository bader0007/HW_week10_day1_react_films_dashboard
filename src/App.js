import { CssBaseline } from "@mui/material"
import { Box } from "@mui/system"
import axios from "axios"
import { useEffect, useState } from "react"
import { Route, Routes } from "react-router-dom"
import { toast } from "react-toastify"
import Sidebar from "./components/Sidebar"
import Films from "./pages/Films"
import FilmsContext from "./utils/FilmsContext"

function App() {
  const [films, setFilms] = useState([])
  const [genres, setGenres] = useState([])
  const [casts, setCasts] = useState([])

  const getFilms = async () => {
    const response = await axios.get("http://localhost:5000/api/films")
    setFilms(response.data)
  }

  const getGenres = async () => {
    const response = await axios.get("http://localhost:5000/api/genres")
    setGenres(response.data)
  }

  const getCasts = async () => {
    const response = await axios.get("http://localhost:5000/api/casts")
    setCasts(response.data)
  }

  useEffect(() => {
    getFilms()
    getGenres()
    getCasts()
  }, [])

  const deleteFilm = async filmId => {
    try {
      await axios.delete(`http://localhost:5000/api/films/${filmId}`, {
        headers: {
          Authorization: localStorage.tokenDashboardFilms,
        },
      })
      toast.success("film deleted")
      getFilms()
    } catch (error) {
      if (error.response) toast.error(error.response.data)
      else console.log(error)
    }
  }
  const deleteGenre = async genreId => {
    try {
      await axios.delete(`http://localhost:5000/api/genres/${genreId}`, {
        headers: {
          Authorization: localStorage.tokenDashboardFilms,
        },
      })
      toast.success("Genre deleted")
      getGenres()
    } catch (error) {
      if (error.response) toast.error(error.response.data)
      else console.log(error)
    }
  }

  const deleteCast = async castId => {
    try {
      await axios.delete(`http://localhost:5000/api/casts/${castId}`, {
        headers: {
          Authorization: localStorage.tokenDashboardFilms,
        },
      })
      toast.success("Cast deleted")
      getCasts()
    } catch (error) {
      if (error.response) toast.error(error.response.data)
      else console.log(error)
    }
  }

  const store = {
    films,
    genres,
    casts,
    deleteFilm,
    deleteGenre,
    deleteCast,
  }

  return (
    <FilmsContext.Provider value={store}>
      <CssBaseline />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}>
          <Routes>
            <Route path="/films" element={<Films />} />
          </Routes>
        </Box>
      </Box>
    </FilmsContext.Provider>
  )
}
export default App
