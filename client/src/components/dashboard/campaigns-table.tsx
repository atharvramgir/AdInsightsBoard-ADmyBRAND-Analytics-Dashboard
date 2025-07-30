import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader } from "@/components/ui/card"; 
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, ArrowUpDown } from "lucide-react";
import type { Campaign } from "@shared/schema";

type SortField = 'name' | 'impressions' | 'clicks' | 'ctr' | 'spend';
type SortDirection = 'asc' | 'desc';

export default function CampaignsTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const { data: campaigns, isLoading } = useQuery<Campaign[]>({
    queryKey: ["/api/campaigns"],
  });

  if (isLoading) {
    return (
      <Card className="bg-white dark:bg-gray-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-40" />
            <div className="flex items-center space-x-4">
              <Skeleton className="h-10 w-64" />
              <Skeleton className="h-10 w-32" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!campaigns) return null;

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredAndSortedCampaigns = campaigns
    .filter(campaign => {
      const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           campaign.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "all" || campaign.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      switch (sortField) {
        case 'name':
          aValue = a.name;
          bValue = b.name;
          break;
        case 'impressions':
          aValue = a.impressions;
          bValue = b.impressions;
          break;
        case 'clicks':
          aValue = a.clicks;
          bValue = b.clicks;
          break;
        case 'ctr':
          aValue = Number(a.ctr);
          bValue = Number(b.ctr);
          break;
        case 'spend':
          aValue = Number(a.spend);
          bValue = Number(b.spend);
          break;
        default:
          aValue = a.name;
          bValue = b.name;
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      } else {
        return sortDirection === 'asc' 
          ? (aValue as number) - (bValue as number)
          : (bValue as number) - (aValue as number);
      }
    });

  const totalPages = Math.ceil(filteredAndSortedCampaigns.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCampaigns = filteredAndSortedCampaigns.slice(startIndex, startIndex + itemsPerPage);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300">Active</Badge>;
      case 'paused':
        return <Badge className="bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300">Paused</Badge>;
      case 'completed':
        return <Badge className="bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-gray-300">Completed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Card className="bg-white dark:bg-gray-800 transition-colors duration-300" data-testid="campaigns-table">
      <CardHeader>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Campaign Details</h3>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <Input
                type="text"
                placeholder="Search campaigns..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
                data-testid="search-input"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter} data-testid="status-filter">
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>  
                <SelectItem value="paused">Paused</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 dark:bg-gray-700">
                <TableHead 
                  className="cursor-pointer hover:text-gray-700 dark:hover:text-gray-300"
                  onClick={() => handleSort('name')}
                  data-testid="sort-name"
                >
                  <div className="flex items-center">
                    Campaign Name
                    <ArrowUpDown size={14} className="ml-1" />
                  </div>
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead 
                  className="cursor-pointer hover:text-gray-700 dark:hover:text-gray-300"
                  onClick={() => handleSort('impressions')}
                  data-testid="sort-impressions"
                >
                  <div className="flex items-center">
                    Impressions
                    <ArrowUpDown size={14} className="ml-1" />
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:text-gray-700 dark:hover:text-gray-300"
                  onClick={() => handleSort('clicks')}
                  data-testid="sort-clicks"
                >
                  <div className="flex items-center">
                    Clicks
                    <ArrowUpDown size={14} className="ml-1" />  
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:text-gray-700 dark:hover:text-gray-300"
                  onClick={() => handleSort('ctr')}
                  data-testid="sort-ctr"
                >
                  <div className="flex items-center">
                    CTR
                    <ArrowUpDown size={14} className="ml-1" />
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:text-gray-700 dark:hover:text-gray-300"
                  onClick={() => handleSort('spend')}
                  data-testid="sort-spend"
                >
                  <div className="flex items-center">
                    Spend
                    <ArrowUpDown size={14} className="ml-1" />
                  </div>
                </TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedCampaigns.map((campaign) => (
                <TableRow key={campaign.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors" data-testid={`campaign-row-${campaign.id}`}>
                  <TableCell>
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{campaign.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{campaign.category}</div>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(campaign.status)}</TableCell>
                  <TableCell className="text-sm text-gray-900 dark:text-white">
                    {campaign.impressions.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-sm text-gray-900 dark:text-white">
                    {campaign.clicks.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-sm text-gray-900 dark:text-white">
                    {campaign.ctr}%
                  </TableCell>
                  <TableCell className="text-sm text-gray-900 dark:text-white">
                    ${Number(campaign.spend).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                        {campaign.status === 'completed' ? 'View' : 'Edit'}
                      </Button>
                      {campaign.status === 'active' && (
                        <Button variant="ghost" size="sm" className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300">
                          Pause  
                        </Button>
                      )}
                      {campaign.status === 'paused' && (
                        <Button variant="ghost" size="sm" className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300">
                          Resume
                        </Button>
                      )}
                      {campaign.status === 'completed' && (
                        <Button variant="ghost" size="sm" className="text-gray-400 cursor-not-allowed" disabled>
                          Ended
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="text-sm text-gray-700 dark:text-gray-300">
            Showing <span className="font-medium">{startIndex + 1}</span> to{" "}
            <span className="font-medium">{Math.min(startIndex + itemsPerPage, filteredAndSortedCampaigns.length)}</span> of{" "}
            <span className="font-medium">{filteredAndSortedCampaigns.length}</span> results
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              data-testid="pagination-previous"
            >
              Previous
            </Button>
            {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => {
              const pageNum = i + 1;
              return (
                <Button
                  key={pageNum}
                  variant={pageNum === currentPage ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(pageNum)}
                  data-testid={`pagination-page-${pageNum}`}
                >
                  {pageNum}
                </Button>
              );
            })}
            {totalPages > 5 && (
              <>
                <span className="text-sm text-gray-500 dark:text-gray-400">...</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(totalPages)}
                  data-testid={`pagination-page-${totalPages}`}
                >
                  {totalPages}
                </Button>
              </>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              data-testid="pagination-next"
            >
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
