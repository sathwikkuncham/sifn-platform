import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FlaskConical, ArrowRight, Users, LayoutDashboard, MessageSquare, FileSpreadsheet } from "lucide-react"

export default function ValidationPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Validation</h1>
        <p className="text-muted-foreground">Test your assumptions and validate your ideas with real users</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Validation Planner</CardTitle>
            <CardDescription>Create a structured validation plan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-primary/10 p-6 rounded-lg flex items-center justify-center">
                <FlaskConical className="h-12 w-12 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground">
                Develop a comprehensive plan to validate your startup idea, including key assumptions to test and
                methods to use.
              </p>
              <div className="bg-primary/10 dark:bg-primary/20 border border-primary/20 p-4 rounded-lg">
                <p className="text-sm font-medium">Our planner helps you:</p>
                <ul className="text-sm text-muted-foreground mt-2 space-y-1 list-disc list-inside">
                  <li>Identify critical assumptions to test</li>
                  <li>Choose appropriate validation methods</li>
                  <li>Set clear success criteria</li>
                  <li>Create a timeline for validation activities</li>
                </ul>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">
              Create Validation Plan
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Customer Interview Guide</CardTitle>
            <CardDescription>Conduct effective customer interviews</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-primary/10 p-6 rounded-lg flex items-center justify-center">
                <Users className="h-12 w-12 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground">
                Learn how to conduct effective customer interviews that uncover genuine insights about problems and
                needs.
              </p>
              <div className="bg-primary/10 dark:bg-primary/20 border border-primary/20 p-4 rounded-lg">
                <p className="text-sm font-medium">Our guide covers:</p>
                <ul className="text-sm text-muted-foreground mt-2 space-y-1 list-disc list-inside">
                  <li>Finding and recruiting interview subjects</li>
                  <li>Crafting effective interview questions</li>
                  <li>Avoiding common biases and pitfalls</li>
                  <li>Analyzing interview results</li>
                </ul>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Access Interview Guide
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Landing Page Builder</CardTitle>
            <CardDescription>Create and test landing pages</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-primary/10 p-4 rounded-lg flex items-center justify-center">
                <LayoutDashboard className="h-8 w-8 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground">
                Build landing pages to test demand for your idea and capture potential customer information.
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Build Landing Page
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Survey Creator</CardTitle>
            <CardDescription>Design effective validation surveys</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-primary/10 p-4 rounded-lg flex items-center justify-center">
                <MessageSquare className="h-8 w-8 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground">
                Create surveys to collect quantitative data about customer problems, needs, and preferences.
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Create Survey
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Validation Dashboard</CardTitle>
            <CardDescription>Track and analyze validation results</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-primary/10 p-4 rounded-lg flex items-center justify-center">
                <FileSpreadsheet className="h-8 w-8 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground">
                Organize and analyze your validation data to make informed decisions about your startup idea.
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View Dashboard
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
