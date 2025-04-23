"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CheckIcon, PhoneIcon, UserPlusIcon } from "lucide-react"

interface Friend {
  id: string
  name: string
  phoneNumber: string
  avatarUrl?: string
}

interface FriendSelectorProps {
  onSelect: (friends: Friend[]) => void
  maxSelections?: number
  preselected?: Friend[]
}

export default function FriendSelector({
  onSelect,
  maxSelections = Number.POSITIVE_INFINITY,
  preselected = [],
}: FriendSelectorProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFriends, setSelectedFriends] = useState<Friend[]>(preselected)
  const [friends, setFriends] = useState<Friend[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showAddNew, setShowAddNew] = useState(false)
  const [newFriendPhone, setNewFriendPhone] = useState("")

  useEffect(() => {
    // Simulate fetching friends from API
    const fetchFriends = async () => {
      setIsLoading(true)
      try {
        // In a real app, this would be an API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock data
        const mockFriends: Friend[] = [
          { id: "1", name: "Sophie Martin", phoneNumber: "+33612345678", avatarUrl: "/contemplative-artist.png" },
          { id: "2", name: "Thomas Dubois", phoneNumber: "+33623456789", avatarUrl: "/contemplative-man.png" },
          { id: "3", name: "Emma Bernard", phoneNumber: "+33634567890", avatarUrl: "/thoughtful-reader.png" },
          { id: "4", name: "Lucas Petit", phoneNumber: "+33645678901", avatarUrl: "/contemplative-youth.png" },
          { id: "5", name: "Chloé Leroy", phoneNumber: "+33656789012", avatarUrl: "/sunlit-portrait.png" },
        ]

        setFriends(mockFriends)
      } catch (error) {
        console.error("Error fetching friends:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchFriends()
  }, [])

  const toggleFriendSelection = (friend: Friend) => {
    setSelectedFriends((prev) => {
      const isSelected = prev.some((f) => f.id === friend.id)

      if (isSelected) {
        return prev.filter((f) => f.id !== friend.id)
      } else {
        if (prev.length >= maxSelections) {
          return prev
        }
        return [...prev, friend]
      }
    })
  }

  useEffect(() => {
    onSelect(selectedFriends)
  }, [selectedFriends, onSelect])

  const filteredFriends = friends.filter(
    (friend) => friend.name.toLowerCase().includes(searchTerm.toLowerCase()) || friend.phoneNumber.includes(searchTerm),
  )

  const handleAddByPhone = () => {
    if (!newFriendPhone) return

    // Check if phone is valid
    const phoneRegex = /^\+?[0-9]{10,15}$/
    if (!phoneRegex.test(newFriendPhone)) {
      // Show error
      return
    }

    // Check if already in friends list
    const existingFriend = friends.find((f) => f.phoneNumber === newFriendPhone)
    if (existingFriend) {
      toggleFriendSelection(existingFriend)
      setNewFriendPhone("")
      setShowAddNew(false)
      return
    }

    // Create new friend
    const newFriend: Friend = {
      id: `new-${Date.now()}`,
      name: `Ami(e) (${newFriendPhone})`,
      phoneNumber: newFriendPhone,
    }

    // Add to selected
    setSelectedFriends((prev) => {
      if (prev.length >= maxSelections) {
        return prev
      }
      return [...prev, newFriend]
    })

    // Reset form
    setNewFriendPhone("")
    setShowAddNew(false)
  }

  return (
    <div className="w-full space-y-4">
      <div className="relative">
        <Input
          type="text"
          placeholder="Rechercher un ami par nom ou numéro..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {/* Selected friends */}
      {selectedFriends.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {selectedFriends.map((friend) => (
            <div key={friend.id} className="flex items-center bg-primary/10 text-primary rounded-full px-3 py-1">
              <Avatar className="h-6 w-6 mr-2">
                <AvatarImage src={friend.avatarUrl || "/placeholder.svg"} alt={friend.name} />
                <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="text-sm">{friend.name}</span>
              <button onClick={() => toggleFriendSelection(friend)} className="ml-2 text-primary hover:text-primary/80">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Friends list */}
      <div className="space-y-2 max-h-60 overflow-y-auto">
        {isLoading ? (
          <div className="flex justify-center py-4">
            <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full"></div>
          </div>
        ) : (
          <>
            {filteredFriends.length > 0 ? (
              filteredFriends.map((friend) => {
                const isSelected = selectedFriends.some((f) => f.id === friend.id)
                return (
                  <div
                    key={friend.id}
                    className={`flex items-center justify-between p-2 rounded-lg cursor-pointer ${
                      isSelected ? "bg-primary/10" : "hover:bg-gray-100"
                    }`}
                    onClick={() => toggleFriendSelection(friend)}
                  >
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage src={friend.avatarUrl || "/placeholder.svg"} alt={friend.name} />
                        <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{friend.name}</p>
                        <p className="text-sm text-gray-500">{friend.phoneNumber}</p>
                      </div>
                    </div>
                    <div
                      className={`h-6 w-6 rounded-full flex items-center justify-center ${
                        isSelected ? "bg-primary text-white" : "border border-gray-300"
                      }`}
                    >
                      {isSelected && <CheckIcon className="h-4 w-4" />}
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="text-center py-4 text-gray-500">Aucun ami trouvé</div>
            )}
          </>
        )}
      </div>

      {/* Add by phone number */}
      {showAddNew ? (
        <div className="mt-4 p-3 border rounded-lg">
          <div className="flex items-center mb-2">
            <PhoneIcon className="h-5 w-5 mr-2 text-gray-500" />
            <h3 className="font-medium">Ajouter par numéro de téléphone</h3>
          </div>
          <div className="flex gap-2">
            <Input
              type="tel"
              placeholder="+33 6 12 34 56 78"
              value={newFriendPhone}
              onChange={(e) => setNewFriendPhone(e.target.value)}
            />
            <Button onClick={handleAddByPhone} size="sm">
              Ajouter
            </Button>
          </div>
        </div>
      ) : (
        <Button
          variant="outline"
          className="w-full mt-2 flex items-center justify-center"
          onClick={() => setShowAddNew(true)}
        >
          <UserPlusIcon className="h-4 w-4 mr-2" />
          Ajouter par numéro de téléphone
        </Button>
      )}
    </div>
  )
}
