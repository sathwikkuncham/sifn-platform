import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckSquare, ArrowRight, BarChart3, LineChart, PieChart, Scale } from "lucide-react"

export default function IdeaEvaluationPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Idea Evaluation</h1>
        <p className="text-muted-foreground">Assess and score your startup ideas against proven criteria</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Friedman's 10-Question Framework</CardTitle>
            <CardDescription>Evaluate your idea against YC's criteria</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-primary/10 p-6 rounded-lg flex items-center justify-center">
                <CheckSquare className="h-12 w-12 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground">
                Apply Jared Friedman's 10-question framework to evaluate your startup idea's potential for success.
              </p>
              <div className="bg-primary/10 dark:bg-primary/20 border border-primary/20 p-4 rounded-lg">
                <p className="text-sm font-medium">Key questions include:</p>
                <ul className="text-sm text-muted-foreground mt-2 space-y-1 list-disc list-inside">
                  <li>Do you have founder/market fit?</li>
                  <li>How big is the market?</li>
                  <li>How acute is the problem?</li>
                  <li>Is this a good idea space?</li>
                </ul>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">
              Start Evaluation
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Market Sizing Tool</CardTitle>
            <CardDescription>Calculate your TAM, SAM, and SOM</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-primary/10 p-6 rounded-lg flex items-center justify-center">
                <PieChart className="h-12 w-12 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground">
                Estimate your Total Addressable Market (TAM), Serviceable Available Market (SAM), and Serviceable
                Obtainable Market (SOM).
              </p>
              <div className="bg-primary/10 dark:bg-primary/20 border border-primary/20 p-4 rounded-lg">
                <p className="text-sm font-medium">Our tool helps you:</p>
                <ul className="text-sm text-muted-foreground mt-2 space-y-1 list-disc list-inside">
                  <li>Use top-down and bottom-up approaches</li>
                  <li>Find reliable market data sources</li>
                  <li>Create defensible market size estimates</li>
                </ul>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Calculate Market Size
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Competitive Analysis</CardTitle>
            <CardDescription>Analyze the competitive landscape</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-primary/10 p-4 rounded-lg flex items-center justify-center">
                <Scale className="h-8 w-8 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground">
                Map out competitors and identify your unique advantages and potential challenges.
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Start Analysis
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Idea Scorecard</CardTitle>
            <CardDescription>Score your idea across key dimensions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-primary/10 p-4 rounded-lg flex items-center justify-center">
                <BarChart3 className="h-8 w-8 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground">
                Rate your idea on factors like market size, problem acuteness, founder fit, and more.
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Score Your Idea
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Idea Comparison</CardTitle>
            <CardDescription>Compare multiple ideas side by side</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-primary/10 p-4 rounded-lg flex items-center justify-center">
                <LineChart className="h-8 w-8 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground">
                Evaluate multiple ideas against each other to identify the most promising opportunities.
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Compare Ideas
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
