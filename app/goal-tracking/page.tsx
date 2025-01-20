'use client'

import React, { useState } from 'react'
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Checkbox } from "../../components/ui/checkbox"

interface Goal {
  id: number
  text: string
  completed: boolean
}

export default function GoalTracking() {
  const [goals, setGoals] = useState<Goal[]>([])
  const [newGoal, setNewGoal] = useState('')

  const addGoal = () => {
    if (newGoal.trim() !== '') {
      setGoals([...goals, { id: Date.now(), text: newGoal, completed: false }])
      setNewGoal('')
    }
  }

  const toggleGoal = (id: number) => {
    setGoals(goals.map(goal => 
      goal.id === id ? { ...goal, completed: !goal.completed } : goal
    ))
  }

  const deleteGoal = (id: number) => {
    setGoals(goals.filter(goal => goal.id !== id))
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Goal Tracking</h1>
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Add New Goal</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <Input
              type="text"
              placeholder="Enter your goal"
              value={newGoal}
              onChange={(e) => setNewGoal(e.target.value)}
            />
            <Button onClick={addGoal}>Add Goal</Button>
          </div>
        </CardContent>
      </Card>
      <div className="space-y-4">
        {goals.map(goal => (
          <Card key={goal.id}>
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={goal.completed}
                  onCheckedChange={() => toggleGoal(goal.id)}
                />
                <span className={goal.completed ? 'line-through' : ''}>
                  {goal.text}
                </span>
              </div>
              <Button variant="destructive" onClick={() => deleteGoal(goal.id)}>
                Delete
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
