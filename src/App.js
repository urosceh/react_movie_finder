import { useState, useEffect } from "react"
import "./App.css"
import Button from "./components/Button"
import Movies from "./components/Movies"
import SearchComponent from "./components/SearchComponent"

function App() {
	const [movies, setMovies] = useState([])
	const [genres, setGenres] = useState([])

	// 	const res = await fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=379499551351838f483ae37443d12e74")
	// 	const data = await res.json()

	// 	console.log(data)
	// 	return data.genres
	// })

	const fetchGenres = async () => {
		const res = await fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=379499551351838f483ae37443d12e74")
		const data = await res.json()

		console.log(data)
		setGenres(data.genres)
	}
	const [query, setQuery] = useState("pearl")
	// const recommendedMovies = [100, 101, 500, 550]

	useEffect(() => {})

	const fetchMovie = async () => {
		// const query = 'berlin'
		const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=379499551351838f483ae37443d12e74&query=${query}`)
		const data = await res.json()

		const pageNumber = data.total_pages

		let allMovies = []

		for (let page = 1; page <= pageNumber; page++) {
			let resPage = await fetch(
				`https://api.themoviedb.org/3/search/movie?api_key=379499551351838f483ae37443d12e74&query=${query}&page=${page}`
			)
			let dataPage = await resPage.json()

			// console.log( page, dataPage.results )

			// allMovies.concat(dataPage.results)

			// allMovies = dataPage.results

			dataPage.results.forEach((result) => {
				allMovies.push(result)
			})
			// console.log(allMovies) radi
		}
		// console.log(allMovies) radi
		return allMovies
		// setMovies(allMovies)
	}

	const setFetchedMovies = async () => {
		const fetchedMovies = await fetchMovie()
		const languages = ["sr", "en", "fr", "es", "ca", "it", "de"]
		let filteredMovies = []

		console.log(fetchedMovies)

		fetchedMovies.forEach((movie) => {
			if (
				!movie.adult &&
				movie.release_date != null &&
				movie.poster_path != null &&
				movie.popularity > 2 &&
				movie.overview !== "" &&
				languages.includes(movie.original_language)
			) {
				filteredMovies.push(movie)
			}
		})

		console.log(filteredMovies)

		setMovies(filteredMovies)
	}

	// const displayMovies = () => {
	//   if (movies.length === 0) {
	//     console.log("no")
	//   }
	//   movies.forEach((movie) => {
	//     console.log(movie)
	//   })
	// }

	// document.addEventListener("onload", fetchAllMovies)
	// document.addEventListener("onload", displayMovies())

	return (
		<div>
			{/* <Button text={'search'} onClick={() => setShowSearch(!showSearch)} /> */}
			<Button text={"clg"} onClick={fetchGenres} />
			{<SearchComponent query={query} onButtonClick={setQuery} genres={genres} />}
			<Button text={"fetch"} onClick={setFetchedMovies} />
			{movies.length > 0 ? <Movies movies={movies} /> : "No movies"}
			{/* { movies.length > 0 ? "has movies" : "No movies" } */}
		</div>
	)
}

export default App
