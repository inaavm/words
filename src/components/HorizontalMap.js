import React from 'react';

const HierarchyDisplay = () => {
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
  };

  return (
    <div className="flex flex-col items-center w-full p-4 bg-gray-50">
      {/* Parent node */}
      <div className="mb-8">
        <div className="px-6 py-3 font-bold text-xl bg-blue-500 text-white rounded-lg shadow-md">
          {data.name}
        </div>
      </div>

      {/* Connecting line */}
      <div className="w-1 h-8 bg-gray-400"></div>

      {/* Secondary nodes */}
      <div className="flex flex-wrap justify-center gap-8 w-full">
        {data.children.map((category, categoryIndex) => (
          <div key={categoryIndex} className="flex flex-col items-center mb-8">
            {/* Category node */}
            <div className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-md text-center mb-2 w-48">
              {category.name}
            </div>

            {/* Connecting line */}
            <div className="w-1 h-4 bg-gray-400"></div>

            {/* Children nodes */}
            <div className="flex flex-col gap-2 mt-2 items-center">
              {category.children.map((child, childIndex) => (
                <div
                  key={childIndex}
                  className="px-3 py-1 bg-yellow-100 border border-yellow-300 rounded-md text-sm w-40 text-center"
                >
                  {child.name}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HierarchyDisplay;