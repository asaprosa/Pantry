'use client'

import React, { useState } from 'react';
import axios from 'axios';
import useSWR from 'swr';
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog";
import { Trash2 } from 'lucide-react'
import { Toast } from "../../components/ui/toast";

interface BookmarkedRecipe {
  id: number;
  recipe: string;
  created_at: string;
}

const fetcher = (url: string) => axios.get(url).then(res => res.data.bookmarkedRecipes);

export default function BookmarkedRecipes() {
  const { data: bookmarkedRecipes, error, mutate } = useSWR<BookmarkedRecipe[]>('/api/bookmarked-recipes', fetcher);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleDeleteBookmark = async (id: number) => {
    try {
      await axios.delete(`/api/bookmarked-recipes/${id}`);
      mutate(
        bookmarkedRecipes?.filter(recipe => recipe.id !== id),
        false
      );
      setToastMessage('Recipe removed from bookmarks');
      setShowToast(true);
    } catch (error) {
      console.error('Error deleting bookmark:', error);
      setToastMessage('Failed to remove recipe from bookmarks');
      setShowToast(true);
    }
  };

  const getRecipeName = (recipeContent: string) => {
    const nameMatch = recipeContent.match(/Recipe Name:(.*)/);
    return nameMatch ? nameMatch[1].trim().replace(/\*/g, '') : 'Unnamed Recipe';
  };

  const formatRecipeContent = (recipeContent: string) => {
    const sections = recipeContent.split('\n\n');
    return sections.map(section => {
      const lines = section.split('\n');
      const formattedLines = lines.map(line => {
        if (line.startsWith('Recipe Name:') || line.startsWith('Ingredients:') || 
            line.startsWith('Instructions:') || line.startsWith('Nutritional Information:') || 
            line.startsWith('Health Considerations:')) {
          return `<h3 class="font-bold text-xl mt-6 mb-3">${line.replace(/\*/g, '')}</h3>`;
        }
        return `<p class="mb-2">${line.replace(/\*/g, '')}</p>`;
      });
      return formattedLines.join('');
    }).join('\n');
  };

  if (error) return <div className="text-center mt-8 text-red-500">Failed to load bookmarked recipes</div>;
  if (!bookmarkedRecipes) return <div className="text-center mt-8">Loading bookmarked recipes...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Bookmarked Recipes</h1>
      {bookmarkedRecipes.length === 0 ? (
        <p>You haven't bookmarked any recipes yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {bookmarkedRecipes.map((bookmarkedRecipe) => (
            <Dialog key={bookmarkedRecipe.id}>
              <DialogTrigger asChild>
                <Card className="cursor-pointer hover:shadow-lg transition-shadow duration-200">
                  <CardHeader>
                    <CardTitle className="text-lg">{getRecipeName(bookmarkedRecipe.recipe)}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500">
                      Bookmarked on {new Date(bookmarkedRecipe.created_at).toLocaleDateString()}
                    </p>
                  </CardContent>
                </Card>
              </DialogTrigger>
              <DialogContent className="max-w-4xl w-[90vw]">
                <DialogHeader>
                  <DialogTitle>{getRecipeName(bookmarkedRecipe.recipe)}</DialogTitle>
                </DialogHeader>
                <div className="mt-4 max-h-[60vh] overflow-y-auto">
                  <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: formatRecipeContent(bookmarkedRecipe.recipe) }} />
                </div>
                <div className="mt-4 flex justify-end">
                  <Button onClick={() => handleDeleteBookmark(bookmarkedRecipe.id)} variant="outline" size="sm">
                    <Trash2 className="h-5 w-5 mr-2" />
                    Remove Bookmark
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      )}
      {showToast && (
        <Toast message={toastMessage} onClose={() => setShowToast(false)} />
      )}
    </div>
  );
}