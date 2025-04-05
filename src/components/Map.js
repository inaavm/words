"use client"

import { useEffect, useRef } from "react"
import * as d3 from "d3"

const data = {
  name: "Sport",
  children: [
    {
      name: "Types of Sport",
      children: [
        { name: "Foussball" },
        { name: "Sportaart" },
        { name: "Ekippsport" },
        { name: "Vëlo" },
        { name: "Box" },
        { name: "Fiederball" },
      ],
    },
    {
      name: "Competition & Performance",
      children: [
        { name: "Rekord" },
        { name: "Nationalekipp" },
        { name: "Ekipp" },
        { name: "Punkte" },
        { name: "gewannen" },
        { name: "verléiren" },
      ],
    },
    {
      name: "Training & Health",
      children: [
        { name: "trainéiren" },
        { name: "Muskelkater" },
        { name: "Kierper" },
        { name: "Geescht" },
        { name: "Leeschtungsfäegkeet" },
      ],
    },
    {
      name: "Sport Events & History",
      children: [
        { name: "D'Olympesch Spiller" },
        { name: "Sportgeschicht" },
        { name: "Tennisgeschicht" },
        { name: "Coupe de Luxembourg" },
      ],
    },
    {
      name: "Sport Infrastructure & Organizations",
      children: [{ name: "Verein" }, { name: "Tribün" }],
    },
  ],
}

const MindMap = () => {
  const svgRef = useRef()

  useEffect(() => {
    if (!svgRef.current) return

    // Clear any existing SVG content
    d3.select(svgRef.current).selectAll("*").remove()

    const width = 1200
    const height = 800

    // Create SVG
    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto; font: 14px sans-serif;")

    // Create a hierarchy from the data
    const root = d3.hierarchy(data)

    // Function to calculate text dimensions
    function getTextDimensions(text, fontSize) {
      const tempText = svg.append("text").attr("font-size", `${fontSize}px`).text(text)

      const bbox = tempText.node()?.getBBox() || { width: 100, height: 20 }
      tempText.remove()

      return {
        width: Math.max(bbox.width + 40, 100), // Min width of 100px
        height: Math.max(bbox.height + 20, 40), // Min height of 40px
      }
    }

    // Calculate dimensions for each node based on text content
    const nodeData = root.descendants().map((d) => {
      const fontSize = d.depth === 0 ? 16 : 14
      const dimensions = getTextDimensions(d.data.name, fontSize)
      return {
        ...d,
        width: dimensions.width,
        height: dimensions.height,
        fontSize,
        x: 0,
        y: 0,
      }
    })

    // Custom layout function for top-down tree with vertical alignment of grandchildren
    function customLayout() {
      // Set position for root node (top center)
      const rootNode = nodeData.find((n) => n.depth === 0)
      rootNode.x = width / 2
      rootNode.y = 100

      // Get level 1 nodes (direct children of root)
      const level1Nodes = nodeData.filter((n) => n.depth === 1)

      // Calculate total width needed for level 1 nodes
      const level1TotalWidth = level1Nodes.reduce((sum, node) => sum + node.width, 0)
      const level1Spacing = 40 // Spacing between level 1 nodes
      const level1TotalSpacing = level1Spacing * (level1Nodes.length - 1)
      const level1TotalWidthWithSpacing = level1TotalWidth + level1TotalSpacing

      // Position level 1 nodes horizontally centered below root
      let currentX = (width - level1TotalWidthWithSpacing) / 3
      level1Nodes.forEach((node) => {
        node.x = currentX + node.width / 3
        node.y = rootNode.y + 100 // Fixed distance from root
        currentX += node.width + level1Spacing
      })

      // Position level 2 nodes (grandchildren) vertically aligned under their parents
      const level2Nodes = nodeData.filter((n) => n.depth === 2)

      // Group level 2 nodes by their parent
      const nodesByParent = {}
      level2Nodes.forEach((node) => {
        const parentData = node.parent.data
        if (!nodesByParent[parentData.name]) {
          nodesByParent[parentData.name] = []
        }
        nodesByParent[parentData.name].push(node)
      })

      // Position each group of level 2 nodes
      Object.keys(nodesByParent).forEach((parentName) => {
        const parentNode = nodeData.find((n) => n.data.name === parentName)
        const childNodes = nodesByParent[parentName]

        // Calculate vertical spacing
        const verticalSpacing = 20
        const totalHeight = childNodes.reduce((sum, node) => sum + node.height, 0)
        const totalSpacing = verticalSpacing * (childNodes.length - 1)
        const totalHeightWithSpacing = totalHeight + totalSpacing

        // Position children vertically centered under their parent
        let currentY = parentNode.y + 80 // Starting Y position below parent

        childNodes.forEach((node) => {
          node.x = parentNode.x // Align X with parent (vertical alignment)
          node.y = currentY + node.height / 2
          currentY += node.height + verticalSpacing
        })
      })
    }

    // Apply the custom layout
    customLayout()

    // Add links between nodes
    const link = svg
      .append("g")
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("stroke-width", 1.5)
      .selectAll()
      .data(root.links())
      .join("path")
      .attr("d", (d) => {
        // Find the source and target node data
        const source = nodeData.find((n) => n.data === d.source.data)
        const target = nodeData.find((n) => n.data === d.target.data)

        // Create a path from source to target
        if (source.depth === 0) {
          // Root to child: straight line from bottom of root to top of child
          return `
            M${source.x},${source.y + source.height / 2}
            L${target.x},${target.y - target.height / 2}
          `
        } else {
          // Child to grandchild: 
          return `
            M${source.x},${source.y + source.height }
            C${source.x},${source.y + source.height }
             ${target.x},${target.y - target.height }
             ${target.x},${target.y - target.height }
          `
        }
      })

    // Create node groups
    const node = svg
      .append("g")
      .selectAll()
      .data(nodeData)
      .join("g")
      .attr("transform", (d) => `translate(${d.x - d.width },${d.y - d.height})`)

    // Add button-like rectangles
    node
      .append("rect")
      // .attr("width", (d) => d.width)
      // .attr("height", (d) => d.height)
      // .attr("rx", 8) // Border radius
      // .attr("ry", 8) // Border radius
      // .style("fill", "white") // White background
      // .style("stroke", "black") // Black border
      // .style("stroke-width", 1.5)
      
      
     
     
    // Add text labels with proper wrapping
    node
      .append("text")
      .attr("x", (d) => d.width / 2)
      .attr("y", (d) => d.height / 2)
      .attr("text-anchor", "left")
      .attr("dominant-baseline", "left")
      .style("font-size", (d) => `${d.fontSize}px`)
      .style("font-weight", (d) => (d.depth === 0 ? "bold" : "normal"))
      .style("fill", "black") // Black text
      .style("pointer-events", "none")
      .each(function (d) {
        const text = d3.select(this)
        const words = d.data.name.split(/\s+/)

        // For short text or single words, just display them
        if (words.length <= 1) {
          text.text(d.data.name)
          return
        }

        // For longer text, wrap it
        const lineHeight = d.fontSize * 1.2
        let line = []
        let lineNumber = 0
        const maxLines = Math.floor(d.height / lineHeight) - 1

        // Create tspans for each line
        let tspan = text
          .append("tspan")
          .attr("x", d.width / 2)
          .attr("dy", (-(words.length - 1) * lineHeight) / 2)

        for (let i = 0; i < words.length; i++) {
          line.push(words[i])
          const testLine = line.join(" ")

          if (getTextDimensions(testLine, d.fontSize).width > d.width - 20 || i === words.length - 1) {
            if (i === words.length - 1) {
              tspan.text(testLine)
            } else {
              line.pop()
              tspan.text(line.join(" "))
              line = [words[i]]

              if (lineNumber < maxLines) {
                lineNumber++
                tspan = text
                  .append("tspan")
                  .attr("x", d.width / 2)
                  .attr("dy", lineHeight)
                  .text(words[i])
              } else {
                // If we've reached the maximum number of lines, add ellipsis
                tspan.text(tspan.text() + "...")
                break
              }
            }
          }
        }
      })
  }, [])

  return (
    <div className="flex justify-center items-center w-full h-full bg-gray-50 p-4">
      <svg ref={svgRef} className="w-full h-full max-w-5xl"></svg>
    </div>
  )
}

export default MindMap

