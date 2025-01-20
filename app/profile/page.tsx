'use client'

import React, { useState } from 'react';
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import axios from 'axios';
import useSWR from 'swr';

interface UserProfile {
  id: number;
  name: string;
  age: string;
  weight: string;
  height: string;
  gender: string;
  chronic_diseases: string;
  allergies: string;
}

const fetcher = (url: string) => axios.get(url).then(res => res.data.user);

export default function Profile() {
  const { data: userProfile, error, mutate } = useSWR<UserProfile>('/api/profile', fetcher);
  const [isUpdating, setIsUpdating] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    if (userProfile) {
      mutate({ ...userProfile, [id]: value }, false);
    }
  };

  const handleSelectChange = (value: string) => {
    if (userProfile) {
      mutate({ ...userProfile, gender: value }, false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    setSuccessMessage('');
    setErrorMessage('');
    try {
      if (userProfile) {
        const response = await axios.post('/api/profile', userProfile);
        if (response.status === 200) {
          setSuccessMessage('Profile updated successfully');
          mutate(response.data.user);
        } else {
          setErrorMessage('Failed to update profile');
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An error occurred while updating the profile');
    } finally {
      setIsUpdating(false);
    }
  };

  if (error) return <div className="text-center mt-8 text-red-600">Failed to load profile</div>;
  if (!userProfile) return <div className="text-center mt-8">Loading profile...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <div className="max-w-md mx-auto border border-gray-300 rounded-lg p-6">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Enter your name" value={userProfile.name} onChange={handleInputChange} />
          </div>
          <div>
            <Label htmlFor="age">Age</Label>
            <Input id="age" type="number" placeholder="Enter your age" value={userProfile.age} onChange={handleInputChange} />
          </div>
          <div>
            <Label htmlFor="weight">Weight (kg)</Label>
            <Input id="weight" type="number" step="0.1" placeholder="Enter your weight" value={userProfile.weight} onChange={handleInputChange} />
          </div>
          <div>
            <Label htmlFor="height">Height (cm)</Label>
            <Input id="height" type="number" placeholder="Enter your height" value={userProfile.height} onChange={handleInputChange} />
          </div>
          <div>
            <Label htmlFor="gender">Gender</Label>
            <Select onValueChange={handleSelectChange} value={userProfile.gender}>
              <SelectTrigger id="gender">
                <SelectValue placeholder="Select your gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="chronic_diseases">Chronic Diseases</Label>
            <Input id="chronic_diseases" placeholder="Enter chronic diseases (if any)" value={userProfile.chronic_diseases} onChange={handleInputChange} />
          </div>
          <div>
            <Label htmlFor="allergies">Allergies</Label>
            <Input id="allergies" placeholder="Enter allergies (if any)" value={userProfile.allergies} onChange={handleInputChange} />
          </div>
          <Button type="submit" className="w-full" disabled={isUpdating}>
            {isUpdating ? 'Updating...' : 'Update Details'}
          </Button>
        </form>
      </div>
      {successMessage && <div className="mt-4 text-green-600">{successMessage}</div>}
      {errorMessage && <div className="mt-4 text-red-600">{errorMessage}</div>}
    </div>
  );
}