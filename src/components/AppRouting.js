import { BrowserRouter, Routes, Route } from "react-router-dom"
import Page from "./components/Page"
import WordHub from "./components/WordHub"

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Your existing route */}
        <Route path="/:category" element={<Page />} />

        {/* New route for the word hub visualization */}
        <Route path="/hub/:category" element={<WordHub />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
