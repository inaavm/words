"use client"

import { useParams, useNavigate } from "react-router-dom"
import "./ToggleViewButton.css"

export default function ToggleViewButton() {
  const { category } = useParams()
  const navigate = useNavigate()
  const isHubView = window.location.pathname.includes("/hub/")

  const toggleView = () => {
    if (isHubView) {
      navigate(`/${category}`)
    } else {
      navigate(`/hub/${category}`)
    }
  }

  return (
    <button className="toggle-view-button" onClick={toggleView}>
      {isHubView ? "List View" : "Hub View"}
    </button>
  )
}
