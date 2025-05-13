import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Rocket, ArrowRight, Code, Users, LineChart, Briefcase } from "lucide-react"

export default function ExecutionPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Execution</h1>
        <p className="text-muted-foreground">
          Turn your validated ideas into reality with structured execution frameworks
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>MVP Builder</CardTitle>
            <CardDescription>Plan and build your Minimum Viable Product</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-primary/10 p-6 rounded-lg flex items-center justify-center">
                <Rocket className="h-12 w-12 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground">
                Define, plan, and build your Minimum Viable Product (MVP) to start testing with real users as quickly as
                possible.
              </p>
              <div className="bg-primary/10 dark:bg-primary/20 border border-primary/20 p-4 rounded-lg">
                <p className="text-sm font-medium">Our MVP Builder helps you:</p>
                <ul className="text-sm text-muted-foreground mt-2 space-y-1 list-disc list-inside">
                  <li>Define the core value proposition</li>
                  <li>Identify essential features vs. nice-to-haves</li>
                  <li>Create a development roadmap</li>
                  <li>Choose the right MVP approach for your idea</li>
                </ul>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">
              Start MVP Planning
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Technical Implementation</CardTitle>
            <CardDescription>Resources for building your product</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-primary/10 p-6 rounded-lg flex items-center justify-center">
                <Code className="h-12 w-12 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground">
                Access resources, tools, and guidance for the technical implementation of your startup idea.
              </p>
              <div className="bg-primary/10 dark:bg-primary/20 border border-primary/20 p-4 rounded-lg">
                <p className="text-sm font-medium">Resources include:</p>
                <ul className="text-sm text-muted-foreground mt-2 space-y-1 list-disc list-inside">
                  <li>Technology stack recommendations</li>
                  <li>Development best practices</li>
                  <li>No-code/low-code options</li>
                  <li>Technical co-founder matching</li>
                </ul>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Explore Technical Resources
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>User Acquisition</CardTitle>
            <CardDescription>Strategies for acquiring early users</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-primary/10 p-4 rounded-lg flex items-center justify-center">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground">
                Learn and implement strategies for acquiring your first users and building initial traction.
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Explore Strategies
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Metrics Dashboard</CardTitle>
            <CardDescription>Track key performance indicators</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-primary/10 p-4 rounded-lg flex items-center justify-center">
                <LineChart className="h-8 w-8 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground">
                Set up and monitor the key metrics that matter for your startup's success and growth.
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Set Up Dashboard
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Operational Setup</CardTitle>
            <CardDescription>Essential business operations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-primary/10 p-4 rounded-lg flex items-center justify-center">
                <Briefcase className="h-8 w-8 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground">
                Set up the essential operational aspects of your startup, from legal to financial foundations.
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Start Setup
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
