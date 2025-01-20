import React from 'react'

export default function Dashboard() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid gap-4">
        <section>
          <h2 className="text-xl font-semibold mb-2">Welcome to Veggify</h2>
          <p>This is your personalized dashboard. Here you can view your progress, recent activities, and quick links to important features.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2">Quick Stats</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-100 rounded-lg">
              <h3 className="font-medium">Recipes Saved</h3>
              <p className="text-2xl font-bold">23</p>
            </div>
            <div className="p-4 bg-blue-100 rounded-lg">
              <h3 className="font-medium">Goals Completed</h3>
              <p className="text-2xl font-bold">5</p>
            </div>
            <div className="p-4 bg-yellow-100 rounded-lg">
              <h3 className="font-medium">Streak Days</h3>
              <p className="text-2xl font-bold">7</p>
            </div>
          </div>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2">Recent Activity</h2>
          <ul className="list-disc pl-5">
            <li>Added new recipe: Vegan Lasagna</li>
            <li>Completed goal: Try 3 new vegetables this week</li>
            <li>Bookmarked article: "Benefits of a Plant-Based Diet"</li>
          </ul>
        </section>
      </div>
    </div>
  )
}