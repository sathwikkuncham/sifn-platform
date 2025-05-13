import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, ArrowRight, Lightbulb, CheckSquare, FlaskConical, Rocket, MessageSquare } from "lucide-react"

export default function AIAugmentationPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">AI Augmentation</h1>
        <p className="text-muted-foreground">Leverage AI to enhance your startup journey</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>AI Startup Assistant</CardTitle>
            <CardDescription>Your AI-powered startup companion</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-primary/10 p-6 rounded-lg flex items-center justify-center">
                <Brain className="h-12 w-12 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground">
                Interact with our AI assistant to get personalized guidance, answer questions, and receive feedback
                throughout your startup journey.
              </p>
              <div className="bg-primary/10 dark:bg-primary/20 p-4 rounded-lg border border-primary/20">
                <p className="text-sm font-medium">Our AI assistant can help with:</p>
                <ul className="text-sm text-muted-foreground mt-2 space-y-1 list-disc list-inside">
                  <li>Answering startup methodology questions</li>
                  <li>Providing feedback on your ideas</li>
                  <li>Suggesting resources and next steps</li>
                  <li>Helping you overcome common challenges</li>
                </ul>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">
              Chat with AI Assistant
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI Idea Analyzer</CardTitle>
            <CardDescription>Get AI-powered analysis of your startup ideas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-primary/10 p-6 rounded-lg flex items-center justify-center">
                <MessageSquare className="h-12 w-12 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground">
                Submit your startup idea for AI analysis to receive insights, potential challenges, and improvement
                suggestions.
              </p>
              <div className="bg-primary/10 dark:bg-primary/20 p-4 rounded-lg border border-primary/20">
                <p className="text-sm font-medium">The analyzer provides:</p>
                <ul className="text-sm text-muted-foreground mt-2 space-y-1 list-disc list-inside">
                  <li>Strengths and weaknesses assessment</li>
                  <li>Market opportunity analysis</li>
                  <li>Potential challenges and risks</li>
                  <li>Suggestions for improvement</li>
                </ul>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Analyze My Idea
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Idea Generation</CardTitle>
            <CardDescription>AI-powered ideation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-primary/10 p-4 rounded-lg flex items-center justify-center">
                <Lightbulb className="h-8 w-8 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground">
                Use AI to generate and refine startup ideas based on your interests and expertise.
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Generate Ideas
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Evaluation</CardTitle>
            <CardDescription>AI evaluation tools</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-primary/10 p-4 rounded-lg flex items-center justify-center">
                <CheckSquare className="h-8 w-8 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground">
                Get AI-powered evaluation of your startup ideas against proven success criteria.
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Evaluate Ideas
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Validation</CardTitle>
            <CardDescription>AI validation assistant</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-primary/10 p-4 rounded-lg flex items-center justify-center">
                <FlaskConical className="h-8 w-8 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground">
                Use AI to design validation experiments and analyze customer feedback data.
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Plan Validation
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Execution</CardTitle>
            <CardDescription>AI execution tools</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-primary/10 p-4 rounded-lg flex items-center justify-center">
                <Rocket className="h-8 w-8 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground">
                Leverage AI to help with MVP planning, user acquisition strategies, and more.
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Execution Tools
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
