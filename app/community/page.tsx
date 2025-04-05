"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  MessageCircle,
  Users,
  Lock,
  Calendar,
  Clock,
  Send,
  ThumbsUp,
  MessageSquare,
  UserPlus,
  Video,
  Award,
  Unlock,
  Check,
} from "lucide-react"
import { useUserStore } from "@/lib/stores/user-store"

export default function Community() {
  const { userLevel, paraCoins } = useUserStore()
  const [newPost, setNewPost] = useState("")
  const [posts, setPosts] = useState([
    {
      name: "Sarah J.",
      avatar: "/Archive/1.JPG",
      time: "2h ago",
      content: "Just completed my 30-day challenge! The accountability in this community made all the difference. My morning meditation practice is now a solid habit.",
      likes: 12,
      comments: 4,
      isExpert: false,
    },
    {
      name: "Coach David",
      avatar: "/Archive/2.jpg",
      time: "3h ago",
      content: "'The only way to do great work is to love what you do.' - Steve Jobs. Remember why you started this journey! What's your primary motivation for transformation?",
      likes: 32,
      comments: 5,
      isExpert: true,
    },
    {
      name: "Michael T.",
      avatar: "/Archive/3.jpg",
      time: "5h ago",
      content: "Anyone else struggling with maintaining consistency? Would love some tips from those who've overcome this. I'm great for the first week but then lose momentum.",
      likes: 8,
      comments: 7,
      isExpert: false,
    },
    {
      name: "Dr. Jennifer K.",
      avatar: "/Archive/4.jpeg",
      time: "6h ago",
      content: "Research shows that habit stacking is one of the most effective ways to build new behaviors. Try attaching your new habit to an existing one! For example, meditate right after brushing your teeth in the morning.",
      likes: 45,
      comments: 12,
      isExpert: true,
    },
  ])

  if (userLevel < 2) {
    return <CommunityLocked level={userLevel} />
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Community</h1>
            <p className="text-gray-500">Connect with fellow members on their transformation journey</p>
          </div>
          <Badge variant="outline" className="text-lg px-3 py-1">
            Level {userLevel} • {paraCoins} PARA Coins
          </Badge>
        </div>

        <Tabs defaultValue="feed">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="feed">
              <MessageCircle className="h-4 w-4 mr-2" />
              Feed
            </TabsTrigger>
            <TabsTrigger value="events">
              <Calendar className="h-4 w-4 mr-2" />
              Events
            </TabsTrigger>
            <TabsTrigger value="experts">
              <UserPlus className="h-4 w-4 mr-2" />
              Experts
            </TabsTrigger>
            <TabsTrigger value="challenges">
              <Award className="h-4 w-4 mr-2" />
              Challenges
            </TabsTrigger>
          </TabsList>

          <TabsContent value="feed" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-6">
                {userLevel >= 3 && (
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <Avatar>
                          <AvatarFallback>You</AvatarFallback>
                          <AvatarImage src="/Archive/1.JPG" />
                        </Avatar>
                        <div className="flex-1">
                          <Input
                            placeholder="Share your thoughts or progress..."
                            className="mb-2"
                            value={newPost}
                            onChange={(e) => setNewPost(e.target.value)}
                          />
                          <div className="flex justify-end">
                            <Button
                              onClick={() => {
                                if (newPost.trim()) {
                                  const newPostObj = {
                                    name: "You",
                                    avatar: "/placeholder.svg?height=40&width=40",
                                    time: "Just now",
                                    content: newPost,
                                    likes: 0,
                                    comments: 0,
                                    isExpert: false,
                                  }
                                  setPosts([newPostObj, ...posts])
                                  setNewPost("")
                                }
                              }}
                              disabled={!newPost.trim()}
                            >
                              <Send className="h-4 w-4 mr-2" />
                              {newPost.trim() ? "Send" : "Post"}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {posts.map((post, index) => (
                  <CommunityPost
                    key={index}
                    name={post.name}
                    avatar={post.avatar}
                    time={post.time}
                    content={post.content}
                    likes={post.likes}
                    comments={post.comments}
                    isExpert={post.isExpert}
                  />
                ))}
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Events</CardTitle>
                    <CardDescription>Join live sessions with the community</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="border rounded-lg p-3">
                      <h3 className="font-medium">Weekly Reflection Circle</h3>
                      <p className="text-sm text-gray-500 mb-2">Share insights and challenges</p>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="h-3 w-3" />
                        <span>Friday, 3:00 PM</span>
                      </div>
                    </div>
                    <div className="border rounded-lg p-3">
                      <h3 className="font-medium">Expert AMA: Overcoming Plateaus</h3>
                      <p className="text-sm text-gray-500 mb-2">Live Q&A with Coach Marcus</p>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="h-3 w-3" />
                        <span>Monday, 1:00 PM</span>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full" asChild>
                      <a href="/events">View All Events</a>
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Active Members</CardTitle>
                    <CardDescription>Connect with fellow challengers</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>SJ</AvatarFallback>
                        <AvatarImage src="/Archive/1.JPG" />
                      </Avatar>
                      <div>
                        <p className="font-medium">Sarah J.</p>
                        <p className="text-xs text-gray-500">Level 3 • 21-day streak</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>MT</AvatarFallback>
                        <AvatarImage src="/Archive/3.jpg" />
                      </Avatar>
                      <div>
                        <p className="font-medium">Michael T.</p>
                        <p className="text-xs text-gray-500">Level 2 • 7-day streak</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>ER</AvatarFallback>
                        <AvatarImage src="/Archive/5.jpeg" />
                      </Avatar>
                      <div>
                        <p className="font-medium">Elena R.</p>
                        <p className="text-xs text-gray-500">Level 3 • 35-day streak</p>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full">
                      View All Members
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="events" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <EventCard
                title="Weekly Reflection Circle"
                description="Share your insights and challenges from the past week"
                date="Friday, April 7"
                time="3:00 PM - 4:00 PM EST"
                host="Sarah Johnson"
                hostAvatar="/Archive/1.JPG"
                participants={18}
                requiredLevel={3}
                userLevel={userLevel}
              />

              <EventCard
                title="Expert AMA: Overcoming Plateaus"
                description="Live Q&A with transformation expert Coach Marcus"
                date="Monday, April 10"
                time="1:00 PM - 2:00 PM EST"
                host="Coach Marcus"
                hostAvatar="/Archive/2.jpg"
                participants={24}
                requiredLevel={2}
                userLevel={userLevel}
              />

              <EventCard
                title="Goal Setting Workshop"
                description="Learn effective techniques for setting and achieving your goals"
                date="Wednesday, April 12"
                time="11:00 AM - 12:30 PM EST"
                host="Dr. Jennifer K."
                hostAvatar="/Archive/4.jpeg"
                participants={32}
                requiredLevel={2}
                userLevel={userLevel}
              />

              <EventCard
                title="Community Challenge Kickoff"
                description="Join the 21-day consistency challenge with fellow members"
                date="Monday, April 17"
                time="4:00 PM - 5:00 PM EST"
                host="Community Team"
                hostAvatar="/Archive/5.jpeg"
                participants={45}
                requiredLevel={3}
                userLevel={userLevel}
              />

              <EventCard
                title="Mindfulness Masterclass"
                description="Deep dive into advanced meditation techniques"
                date="Thursday, April 20"
                time="2:00 PM - 3:30 PM EST"
                host="Dr. Sarah Chen"
                hostAvatar="/Archive/4.jpeg"
                participants={28}
                requiredLevel={2}
                userLevel={userLevel}
              />

              <EventCard
                title="Productivity Systems Workshop"
                description="Build systems that make consistency effortless"
                date="Tuesday, April 25"
                time="1:00 PM - 2:00 PM EST"
                host="James Wilson"
                hostAvatar="/Archive/3.jpg"
                participants={36}
                requiredLevel={2}
                userLevel={userLevel}
              />
            </div>
          </TabsContent>

          <TabsContent value="experts" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ExpertCard
                name="Dr. Jennifer K."
                title="Mindset & Psychology Expert"
                avatar="/Community/1.jpg?height=200&width=200"
                bio="Specializes in helping people overcome limiting beliefs and develop resilient mindsets. PhD in Psychology with 15 years of experience in personal transformation."
                expertise={["Mindset Transformation", "Habit Formation", "Emotional Intelligence"]}
                requiredLevel={2}
                userLevel={userLevel}
              />

              <ExpertCard
                name="Coach Marcus"
                title="Performance & Productivity Coach"
                avatar="/Community/2.webp?height=200&width=200"
                bio="Former Olympic athlete turned productivity expert. Helps high-achievers optimize their systems and routines for peak performance and sustainable growth."
                expertise={["Peak Performance", "Goal Achievement", "Time Management"]}
                requiredLevel={2}
                userLevel={userLevel}
              />

              <ExpertCard
                name="Sarah Chen, PhD"
                title="Meditation & Mindfulness Guide"
                avatar="/Community/3.jpeg?height=200&width=200"
                bio="Meditation practitioner with over 20 years of experience. Combines Eastern wisdom with modern neuroscience to help people develop deeper awareness."
                expertise={["Meditation", "Stress Reduction", "Present Moment Awareness"]}
                requiredLevel={2}
                userLevel={userLevel}
              />

              <ExpertCard
                name="David Rodriguez"
                title="Physical Transformation Specialist"
                avatar="/Community/4.jpeg?height=200&width=200"
                bio="Certified fitness trainer and nutritionist who focuses on sustainable lifestyle changes rather than quick fixes. Specializes in habit-based fitness."
                expertise={["Fitness Habits", "Nutrition", "Energy Management"]}
                requiredLevel={3}
                userLevel={userLevel}
              />

              <ExpertCard
                name="Dr. Michael Lee"
                title="Sleep & Recovery Expert"
                avatar="/community/5.jpeg?height=200&width=200"
                bio="Neuroscientist specializing in sleep optimization and recovery protocols. Helps high-performers enhance their rest for better overall performance."
                expertise={["Sleep Optimization", "Recovery Protocols", "Circadian Rhythms"]}
                requiredLevel={3}
                userLevel={userLevel}
              />

              <ExpertCard
                name="Elena Patel"
                title="Purpose & Vision Coach"
                avatar="/Community/6.jpeg?height=200&width=200"
                bio="Guides individuals in discovering their core values and aligning their goals with deeper purpose. Former executive who found meaning through personal transformation."
                expertise={["Purpose Discovery", "Vision Setting", "Values Alignment"]}
                requiredLevel={3}
                userLevel={userLevel}
              />
            </div>
          </TabsContent>

          <TabsContent value="challenges" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CommunityChallenge
                title="21-Day Meditation Challenge"
                description="Build a consistent meditation practice with daily guided sessions"
                participants={124}
                startDate="April 10"
                duration="21 days"
                requiredLevel={2}
                userLevel={userLevel}
              />

              <CommunityChallenge
                title="Morning Routine Mastery"
                description="Transform your mornings to set yourself up for daily success"
                participants={87}
                startDate="April 15"
                duration="30 days"
                requiredLevel={2}
                userLevel={userLevel}
              />

              <CommunityChallenge
                title="Digital Detox Weekend"
                description="Reset your relationship with technology and reclaim your focus"
                participants={56}
                startDate="April 22"
                duration="Weekend"
                requiredLevel={2}
                userLevel={userLevel}
              />

              <CommunityChallenge
                title="Gratitude Journal Challenge"
                description="Develop a daily gratitude practice to boost wellbeing"
                participants={103}
                startDate="Ongoing"
                duration="14 days"
                requiredLevel={2}
                userLevel={userLevel}
              />

              <CommunityChallenge
                title="Fitness Consistency Challenge"
                description="Commit to daily movement, no matter how small"
                participants={142}
                startDate="April 1"
                duration="30 days"
                requiredLevel={3}
                userLevel={userLevel}
              />

              <CommunityChallenge
                title="Mindful Eating Practice"
                description="Transform your relationship with food through awareness"
                participants={68}
                startDate="April 18"
                duration="28 days"
                requiredLevel={3}
                userLevel={userLevel}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function CommunityLocked({ level }: { level: number }) {
  return (
    <div className="container mx-auto p-4 flex items-center justify-center min-h-[70vh]">
      <Card className="max-w-md w-full">
        <CardContent className="pt-6 text-center">
          <Lock className="h-16 w-16 mx-auto mb-4 text-gray-400" />
          <h2 className="text-2xl font-bold mb-2">Community Access Locked</h2>
          <p className="text-gray-500 mb-6">
            {level === 1
              ? "You need to reach Level 2 to access the community features. Complete tasks to earn PARA Coins and level up!"
              : "You're close! Continue earning PARA Coins to unlock full community access at Level 3."}
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant={level >= 1 ? "default" : "outline"}>Level 1</Badge>
              <span className="text-sm">Solo Journey - AI Coach Access</span>
              <Unlock className="h-3 w-3 ml-auto text-green-500" />
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={level >= 2 ? "default" : "outline"}>Level 2</Badge>
              <span className="text-sm">Mentor Access - Expert Guidance</span>
              {level < 2 && <Lock className="h-3 w-3 ml-auto" />}
              {level >= 2 && <Unlock className="h-3 w-3 ml-auto text-green-500" />}
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={level >= 3 ? "default" : "outline"}>Level 3</Badge>
              <span className="text-sm">Community Access - Full Features</span>
              <Lock className="h-3 w-3 ml-auto" />
            </div>
          </div>
          <Button className="w-full mt-6" asChild>
            <a href="/dashboard">Return to Dashboard</a>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

interface CommunityPostProps {
  name: string
  avatar: string
  time: string
  content: string
  likes: number
  comments: number
  isExpert: boolean
}

function CommunityPost({ name, avatar, time, content, likes, comments, isExpert }: CommunityPostProps) {
  const [liked, setLiked] = useState(false)

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start gap-3 mb-3">
          <Avatar>
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
            <AvatarImage src={avatar} />
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium">{name}</span>
              {isExpert && (
                <Badge variant="outline" className="h-5 flex items-center text-xs">
                  <UserPlus className="h-3 w-3 mr-1" />
                  Expert
                </Badge>
              )}
            </div>
            <p className="text-xs text-gray-500">{time}</p>
          </div>
        </div>
        <p className="mb-4">{content}</p>
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            className={`flex items-center gap-1 ${liked ? "text-blue-500" : ""}`}
            onClick={() => setLiked(!liked)}
          >
            <ThumbsUp className="h-4 w-4" />
            {liked ? likes + 1 : likes}
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center gap-1">
            <MessageSquare className="h-4 w-4" />
            {comments}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

interface EventCardProps {
  title: string
  description: string
  date: string
  time: string
  host: string
  hostAvatar: string
  participants: number
  requiredLevel: number
  userLevel: number
}

function EventCard({
  title,
  description,
  date,
  time,
  host,
  hostAvatar,
  participants,
  requiredLevel,
  userLevel,
}: EventCardProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div>
          <h3 className="font-semibold text-lg">{title}</h3>
          <p className="text-sm text-gray-500 mb-3">{description}</p>
          <div className="flex flex-wrap gap-2 mb-3">
            <Badge variant="outline" className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {date}
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {time}
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              {participants} participants
            </Badge>
          </div>
          <div className="flex items-center gap-2 mb-4">
            <Avatar className="h-6 w-6">
              <AvatarFallback>{host.charAt(0)}</AvatarFallback>
              <AvatarImage src={hostAvatar} />
            </Avatar>
            <span className="text-sm">Hosted by {host}</span>
          </div>
          <div>
            {userLevel >= requiredLevel ? (
              <Button className="w-full flex items-center gap-1">
                <Video className="h-4 w-4" />
                Join Event
              </Button>
            ) : (
              <Button disabled variant="outline" className="w-full flex items-center gap-1">
                <Lock className="h-4 w-4 mr-1" />
                Level {requiredLevel} Required
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

interface ExpertCardProps {
  name: string
  title: string
  avatar: string
  bio: string
  expertise: string[]
  requiredLevel: number
  userLevel: number
}

function ExpertCard({ name, title, avatar, bio, expertise, requiredLevel, userLevel }: ExpertCardProps) {
  return (
    <Card>
      <div className="relative">
        <img src={avatar || "/placeholder.svg"} alt={name} className="w-full h-48 object-cover" />
        {userLevel < requiredLevel && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="text-center text-white">
              <Lock className="h-8 w-8 mx-auto mb-2" />
              <p className="text-sm">Reach Level {requiredLevel} to Access</p>
            </div>
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <h3 className="font-bold text-lg">{name}</h3>
        <p className="text-sm text-gray-500 mb-3">{title}</p>
        <p className="text-sm mb-3">{bio}</p>
        <div className="mb-4">
          <p className="text-sm font-medium mb-2">Areas of Expertise:</p>
          <div className="flex flex-wrap gap-2">
            {expertise.map((item, index) => (
              <Badge key={index} variant="outline">
                {item}
              </Badge>
            ))}
          </div>
        </div>
        {userLevel >= requiredLevel ? (
          <Button className="w-full">Schedule Session</Button>
        ) : (
          <Button disabled variant="outline" className="w-full">
            <Lock className="h-4 w-4 mr-1" />
            Level {requiredLevel} Required
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

interface CommunityChallenge {
  title: string
  description: string
  participants: number
  startDate: string
  duration: string
  requiredLevel: number
  userLevel: number
}

function CommunityChallenge({
  title,
  description,
  participants,
  startDate,
  duration,
  requiredLevel,
  userLevel,
}: CommunityChallenge) {
  const { joinChallenge, leaveChallenge, hasJoinedChallenge } = useUserStore();
  const isJoined = hasJoinedChallenge(title);

  const handleToggleJoin = () => {
    if (isJoined) {
      leaveChallenge(title);
    } else {
      joinChallenge(title);
    }
  };

  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="text-sm text-gray-500 mb-3">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="outline" className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            {participants + (isJoined ? 1 : 0)} participants
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            Starts: {startDate}
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            Duration: {duration}
          </Badge>
        </div>
        {userLevel >= requiredLevel ? (
          <Button 
            className="w-full"
            variant={isJoined ? "secondary" : "default"}
            onClick={handleToggleJoin}
          >
            {isJoined ? (
              <>
                <Check className="h-4 w-4 mr-1" />
                Joined
              </>
            ) : (
              "Join Challenge"
            )}
          </Button>
        ) : (
          <Button disabled variant="outline" className="w-full">
            <Lock className="h-4 w-4 mr-1" />
            Level {requiredLevel} Required
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

