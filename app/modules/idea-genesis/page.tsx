import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Lightbulb, Brain, Target, Sparkles, Compass } from "lucide-react"

export default function IdeaGenesisPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Idea Genesis</h1>
        <p className="text-muted-foreground">Generate and refine promising startup ideas</p>
      </div>

      <Tabs defaultValue="frameworks" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-primary/10 dark:bg-primary/20 border border-primary/20">
          <TabsTrigger value="frameworks">Frameworks</TabsTrigger>
          <TabsTrigger value="generator">Idea Generator</TabsTrigger>
          <TabsTrigger value="refinement">Refinement</TabsTrigger>
        </TabsList>

        <TabsContent value="frameworks" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Paul Graham's Method</CardTitle>
                <CardDescription>Solve problems you experience personally</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-primary/10 p-6 rounded-lg flex items-center justify-center">
                    <Lightbulb className="h-12 w-12 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Learn and apply Paul Graham's approach to generating startup ideas by noticing problems in your own
                    life and work.
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  Explore Framework
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Friedman's Approach</CardTitle>
                <CardDescription>Systematic idea generation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-primary/10 p-6 rounded-lg flex items-center justify-center">
                    <Target className="h-12 w-12 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Apply Jared Friedman's systematic approach to finding promising startup ideas in fertile idea
                    spaces.
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Explore Framework
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Design Thinking</CardTitle>
                <CardDescription>Human-centered innovation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-primary/10 p-6 rounded-lg flex items-center justify-center">
                    <Compass className="h-12 w-12 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Use design thinking methodology to identify problems and generate innovative solutions.
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Explore Framework
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Blue Ocean Strategy</CardTitle>
                <CardDescription>Create uncontested market space</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-primary/10 p-6 rounded-lg flex items-center justify-center">
                    <Sparkles className="h-12 w-12 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Apply Blue Ocean Strategy to create new market space rather than competing in existing markets.
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Explore Framework
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="generator" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>AI-Powered Idea Generator</CardTitle>
              <CardDescription>Generate startup ideas based on your interests and expertise</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-primary/10 p-6 rounded-lg flex items-center justify-center">
                  <Brain className="h-16 w-16 text-primary" />
                </div>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Our AI-powered idea generator helps you brainstorm startup ideas based on your expertise, interests,
                    and market trends. It applies proven frameworks to suggest ideas with potential.
                  </p>
                  <div className="bg-primary/10 dark:bg-primary/20 border border-primary/20 p-4 rounded-lg">
                    <p className="text-sm font-medium">How it works:</p>
                    <ol className="text-sm text-muted-foreground mt-2 space-y-2 list-decimal list-inside">
                      <li>Enter your areas of expertise and interests</li>
                      <li>Specify market trends or technologies you're interested in</li>
                      <li>Choose idea generation frameworks to apply</li>
                      <li>Review and refine generated ideas</li>
                    </ol>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                Launch Idea Generator
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="refinement" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Idea Refinement Workshop</CardTitle>
                <CardDescription>Improve and iterate on your ideas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-primary/10 p-6 rounded-lg flex items-center justify-center">
                    <Sparkles className="h-12 w-12 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Use structured exercises and prompts to refine your startup ideas and make them more compelling and
                    viable.
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Start Workshop</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Idea Library</CardTitle>
                <CardDescription>Save and organize your ideas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-primary/10 p-6 rounded-lg flex items-center justify-center">
                    <Lightbulb className="h-12 w-12 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Store, organize, and revisit your startup ideas. Track their development and refinement over time.
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View Idea Library
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
