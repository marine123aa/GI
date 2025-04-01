import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Button } from "../components/ui/button";
import { Slider } from "../components/ui/slider";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Input } from "../components/ui/input";
import { Download, Calendar, Filter, Image } from "lucide-react";
import { format } from "date-fns";

interface AnalysisResult {
  id: string;
  date: string;
  imageName: string;
  imageUrl: string;
  scores: {
    sexual: number;
    violence: number;
    discrimination: number;
    illegal: number;
    fake: number;
    shocking: number;
    culture: number;
    privacy: number;
    disrespect: number;
  };
  totalScore: number;
  reason: string;
}

interface AnalysisResultsProps {
  results?: AnalysisResult[];
  onDownload?: () => void;
  onFilterChange?: (startDate: string, endDate: string) => void;
}

const AnalysisResults = ({
  results = mockResults,
  onDownload = () => console.log("Download results"),
  onFilterChange = (startDate, endDate) =>
    console.log("Filter changed", { startDate, endDate }),
}: AnalysisResultsProps) => {
  const [startDate, setStartDate] = useState<string>(
    format(new Date(), "yyyy-MM-dd"),
  );
  const [endDate, setEndDate] = useState<string>(
    format(new Date(), "yyyy-MM-dd"),
  );
  const [activeTab, setActiveTab] = useState<string>("table");
  const [selectedImage, setSelectedImage] = useState<AnalysisResult | null>(
    results[0] || null,
  );

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
    onFilterChange(e.target.value, endDate);
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value);
    onFilterChange(startDate, e.target.value);
  };

  const handleImageSelect = (result: AnalysisResult) => {
    setSelectedImage(result);
    setActiveTab("detail");
  };

  return (
    <div className="w-full h-full bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-bold">Analysis Results</h2>
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <Input
              type="date"
              value={startDate}
              onChange={handleStartDateChange}
              className="w-40"
            />
            <span className="text-gray-500">~</span>
            <Input
              type="date"
              value={endDate}
              onChange={handleEndDateChange}
              className="w-40"
            />
          </div>
        </div>
        <Button onClick={onDownload} className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Download Results
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="table">Table View</TabsTrigger>
          <TabsTrigger value="detail">Detail View</TabsTrigger>
        </TabsList>

        <TabsContent value="table" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Image</TableHead>
                    <TableHead>Sexual</TableHead>
                    <TableHead>Violence</TableHead>
                    <TableHead>Discrimination</TableHead>
                    <TableHead>Illegal</TableHead>
                    <TableHead>Fake</TableHead>
                    <TableHead>Shocking</TableHead>
                    <TableHead>Culture</TableHead>
                    <TableHead>Privacy</TableHead>
                    <TableHead>Disrespect</TableHead>
                    <TableHead>Total Score</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results.map((result) => (
                    <TableRow key={result.id}>
                      <TableCell>{result.date}</TableCell>
                      <TableCell>
                        <div className="relative h-10 w-10 rounded overflow-hidden">
                          <img
                            src={result.imageUrl}
                            alt={result.imageName}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </TableCell>
                      <TableCell>{result.scores.sexual}</TableCell>
                      <TableCell>{result.scores.violence}</TableCell>
                      <TableCell>{result.scores.discrimination}</TableCell>
                      <TableCell>{result.scores.illegal}</TableCell>
                      <TableCell>{result.scores.fake}</TableCell>
                      <TableCell>{result.scores.shocking}</TableCell>
                      <TableCell>{result.scores.culture}</TableCell>
                      <TableCell>{result.scores.privacy}</TableCell>
                      <TableCell>{result.scores.disrespect}</TableCell>
                      <TableCell>
                        <span
                          className={`font-bold ${getScoreColor(result.totalScore)}`}
                        >
                          {result.totalScore}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleImageSelect(result)}
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="detail">
          {selectedImage && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Image Preview</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <div className="relative h-80 w-full rounded overflow-hidden">
                    <img
                      src={selectedImage.imageUrl}
                      alt={selectedImage.imageName}
                      className="h-full w-full object-contain"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Analysis Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium mb-2">
                      Date: {selectedImage.date}
                    </h3>
                    <h3 className="text-sm font-medium mb-2">
                      Image: {selectedImage.imageName}
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {Object.entries(selectedImage.scores).map(
                      ([category, score]) => (
                        <div key={category} className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium capitalize">
                              {category}
                            </span>
                            <span
                              className={`text-sm font-bold ${getScoreColor(score)}`}
                            >
                              {score}
                            </span>
                          </div>
                          <Slider
                            defaultValue={[score]}
                            max={5}
                            step={1}
                            disabled
                            className="cursor-default"
                          />
                        </div>
                      ),
                    )}
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Total Score</span>
                      <span
                        className={`text-sm font-bold ${getScoreColor(selectedImage.totalScore)}`}
                      >
                        {selectedImage.totalScore}
                      </span>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-md">
                      <h4 className="text-sm font-medium mb-2">Reason:</h4>
                      <p className="text-sm text-gray-600">
                        {selectedImage.reason}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Helper function to get color based on score
const getScoreColor = (score: number): string => {
  if (score <= 1) return "text-green-600";
  if (score <= 2) return "text-green-500";
  if (score <= 3) return "text-yellow-500";
  if (score <= 4) return "text-orange-500";
  return "text-red-600";
};

// Mock data for default display
const mockResults: AnalysisResult[] = [
  {
    id: "1",
    date: "2023-06-15",
    imageName: "image_001.jpg",
    imageUrl:
      "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&q=80",
    scores: {
      sexual: 1,
      violence: 2,
      discrimination: 1,
      illegal: 1,
      fake: 3,
      shocking: 2,
      culture: 1,
      privacy: 1,
      disrespect: 2,
    },
    totalScore: 2,
    reason:
      "The image contains some elements that could be considered fake or misleading, but overall is relatively safe.",
  },
  {
    id: "2",
    date: "2023-06-16",
    imageName: "image_002.jpg",
    imageUrl:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80",
    scores: {
      sexual: 1,
      violence: 4,
      discrimination: 2,
      illegal: 3,
      fake: 1,
      shocking: 4,
      culture: 1,
      privacy: 1,
      disrespect: 3,
    },
    totalScore: 4,
    reason:
      "This image contains violent and shocking content that may be disturbing to viewers. It also depicts potentially illegal activities.",
  },
  {
    id: "3",
    date: "2023-06-17",
    imageName: "image_003.jpg",
    imageUrl:
      "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=400&q=80",
    scores: {
      sexual: 1,
      violence: 1,
      discrimination: 1,
      illegal: 1,
      fake: 1,
      shocking: 1,
      culture: 1,
      privacy: 1,
      disrespect: 1,
    },
    totalScore: 1,
    reason:
      "The image is appropriate and does not contain any concerning content across all evaluation categories.",
  },
  {
    id: "4",
    date: "2023-06-18",
    imageName: "image_004.jpg",
    imageUrl:
      "https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?w=400&q=80",
    scores: {
      sexual: 3,
      violence: 1,
      discrimination: 1,
      illegal: 1,
      fake: 2,
      shocking: 2,
      culture: 1,
      privacy: 2,
      disrespect: 1,
    },
    totalScore: 3,
    reason:
      "The image contains some suggestive content that may be inappropriate for certain audiences. There are also minor concerns about fakeness and privacy.",
  },
  {
    id: "5",
    date: "2023-06-19",
    imageName: "image_005.jpg",
    imageUrl:
      "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=400&q=80",
    scores: {
      sexual: 1,
      violence: 1,
      discrimination: 4,
      illegal: 2,
      fake: 1,
      shocking: 3,
      culture: 4,
      privacy: 1,
      disrespect: 5,
    },
    totalScore: 5,
    reason:
      "This image contains highly disrespectful content with significant discrimination concerns. It also has cultural insensitivity issues that make it inappropriate.",
  },
];

export default AnalysisResults;
