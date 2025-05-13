import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Users, UserPlus, Building2, Briefcase, GraduationCap, BookOpen } from "lucide-react"
import Link from "next/link"

export default function OnboardingPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Founder Onboarding</h1>
        <p className="text-muted-foreground">Complete your profile and prepare for your startup journey</p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-primary/10 dark:bg-primary/20 border border-primary/20">
          <TabsTrigger value="profile">Founder Profile</TabsTrigger>
          <TabsTrigger value="team">Team Building</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Tell us about yourself as a founder</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-primary/10 p-6 rounded-lg flex items-center justify-center">
                    <Users className="h-12 w-12 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Complete your founder profile to help us personalize your experience and connect you with relevant
                    resources.
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  Complete Profile
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Background & Expertise</CardTitle>
                <CardDescription>Your skills and experience</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-primary/10 dark:bg-primary/20 border border-primary/20 p-4 rounded-lg flex flex-col items-center text-center">
                      <Briefcase className="h-8 w-8 text-primary mb-2" />
                      <h3 className="font-medium">Professional</h3>
                      <p className="text-xs text-muted-foreground">Work experience</p>
                    </div>
                    <div className="bg-primary/10 dark:bg-primary/20 border border-primary/20 p-4 rounded-lg flex flex-col items-center text-center">
                      <GraduationCap className="h-8 w-8 text-primary mb-2" />
                      <h3 className="font-medium">Education</h3>
                      <p className="text-xs text-muted-foreground">Academic background</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Add your professional and educational background to help identify your founder-market fit.
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Add Background
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="team" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Build Your Team</CardTitle>
                <CardDescription>Find co-founders and team members</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-primary/10 p-6 rounded-lg flex items-center justify-center">
                    <UserPlus className="h-12 w-12 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Finding the right co-founders and team members is crucial for startup success. Use our tools to
                    build your founding team.
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Find Co-Founders</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Company Formation</CardTitle>
                <CardDescription>Legal and operational setup</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-primary/10 p-6 rounded-lg flex items-center justify-center">
                    <Building2 className="h-12 w-12 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Set up your company's legal structure, equity distribution, and operational foundations.
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Start Company Setup
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="resources" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Startup Guides</CardTitle>
                <CardDescription>Essential knowledge for founders</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-primary/10 p-6 rounded-lg flex items-center justify-center">
                    <BookOpen className="h-12 w-12 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Access comprehensive guides on all aspects of building a successful startup.
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/guides" className="w-full">
                  <Button variant="outline" className="w-full">
                    Explore Guides
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Founder Community</CardTitle>
                <CardDescription>Connect with other founders</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-primary/10 p-6 rounded-lg flex items-center justify-center">
                    <Users className="h-12 w-12 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Join our community of founders to share experiences, get advice, and build connections.
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Join Community
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Startup Tools</CardTitle>
                <CardDescription>Essential tools and resources</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-primary/10 p-6 rounded-lg flex items-center justify-center">
                    <Briefcase className="h-12 w-12 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Access discounts and resources for tools that will help you build your startup.
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Explore Tools
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
