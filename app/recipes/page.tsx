'use client'

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select"
import { BookmarkIcon } from 'lucide-react'
import { Toast } from "../../components/ui/toast"

export default function RecipeGenerator() {
  const [ingredients, setIngredients] = useState('');
  const [mealType, setMealType] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [cookingTime, setCookingTime] = useState('');
  const [complexity, setComplexity] = useState('');
  const [generatedRecipe, setGeneratedRecipe] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('/api/profile');
        setUserProfile(response.data.user);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setUserProfile(null);
      }
    };
    fetchUserProfile();
  }, []);

  const handleGenerateRecipe = async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await axios.post('/api/generate-recipe', {
        ingredients,
        mealType,
        cuisine,
        cookingTime,
        complexity,
        userProfile
      });
      setGeneratedRecipe(response.data.recipe);
    } catch (error) {
      console.error('Error generating recipe:', error);
      setError('An error occurred while generating the recipe. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBookmark = async () => {
    try {
      await axios.post('/api/bookmark-recipe', { recipe: generatedRecipe });
      setToastMessage('Recipe bookmarked successfully!');
      setShowToast(true);
    } catch (error) {
      console.error('Error bookmarking recipe:', error);
      setToastMessage('Failed to bookmark recipe. Please try again.');
      setShowToast(true);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Recipe Generator</h1>
      <div className="max-w-md mx-auto space-y-4">
        <div>
          <Label htmlFor="ingredients">Ingredients</Label>
          <Input
            id="ingredients"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="Enter ingredients, separated by commas"
          />
        </div>
        <div>
          <Label htmlFor="mealType">Meal Type</Label>
          <Select onValueChange={setMealType} value={mealType}>
            <SelectTrigger id="mealType">
              <SelectValue placeholder="Select meal type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="breakfast">Breakfast</SelectItem>
              <SelectItem value="lunch">Lunch</SelectItem>
              <SelectItem value="dinner">Dinner</SelectItem>
              <SelectItem value="snack">Snack</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="cuisine">Cuisine</Label>
          <Select onValueChange={setCuisine} value={cuisine}>
            <SelectTrigger id="cuisine">
              <SelectValue placeholder="Select cuisine" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="italian">Italian</SelectItem>
              <SelectItem value="chinese">Chinese</SelectItem>
              <SelectItem value="mexican">Mexican</SelectItem>
              <SelectItem value="indian">Indian</SelectItem>
              <SelectItem value="japanese">Japanese</SelectItem>
              <SelectItem value="french">French</SelectItem>
              <SelectItem value="thai">Thai</SelectItem>
              <SelectItem value="mediterranean">Mediterranean</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="cookingTime">Cooking Time (minutes)</Label>
          <Input
            id="cookingTime"
            type="number"
            value={cookingTime}
            onChange={(e) => setCookingTime(e.target.value)}
            placeholder="Enter cooking time in minutes"
          />
        </div>
        <div>
          <Label htmlFor="complexity">Complexity</Label>
          <Select onValueChange={setComplexity} value={complexity}>
            <SelectTrigger id="complexity">
              <SelectValue placeholder="Select complexity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="easy">Easy</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="hard">Hard</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={handleGenerateRecipe} disabled={isLoading} className="w-full">
          {isLoading ? 'Generating...' : 'Generate Recipe'}
        </Button>
      </div>
      {isLoading && <p className="mt-4 text-center">Generating your personalized recipe...</p>}
      {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
      {generatedRecipe && (
        <div className="mt-8 max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold">Generated Recipe:</h2>
            <Button onClick={handleBookmark} variant="outline" size="sm">
              <BookmarkIcon className="h-5 w-5 mr-2" />
              Bookmark
            </Button>
          </div>
          <pre className="whitespace-pre-wrap bg-gray-100 p-4 rounded">{generatedRecipe}</pre>
        </div>
      )}
      {showToast && (
        <Toast message={toastMessage} onClose={() => setShowToast(false)} />
      )}
    </div>
  );
}