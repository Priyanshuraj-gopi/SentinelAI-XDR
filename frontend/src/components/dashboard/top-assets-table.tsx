"use client";

import React from "react";
import { Server, ShieldCheck, ShieldAlert, Lock, ArrowUpRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { RiskIndicator } from "@/components/ui/risk-indicator";
import { Button } from "@/components/ui/button";

interface TopAsset {
  id: string;
  name: string;
  type: string;
  ip: string;
  risk: number;
  status: "Critical" | "High" | "Medium" | "Low";
  isolated: boolean;
}

interface TopAssetsTableProps {
  onIsolateAsset?: (assetName: string) => void;
}

export function TopAssetsTable({ onIsolateAsset }: TopAssetsTableProps) {
  const assets: TopAsset[] = [
    {
      id: "ast-1",
      name: "DC-PRIMARY-01.corp",
      type: "Domain Controller (AD DS)",
      ip: "10.0.1.10",
      risk: 96.4,
      status: "Critical",
      isolated: false,
    },
    {
      id: "ast-2",
      name: "DB-PROD-FINANCE.corp",
      type: "SQL Always-On Cluster",
      ip: "10.0.2.45",
      risk: 91.2,
      status: "High",
      isolated: false,
    },
    {
      id: "ast-3",
      name: "VPN-GW-EAST.corp",
      type: "Ingress Edge Firewall",
      ip: "192.168.1.1",
      risk: 84.7,
      status: "High",
      isolated: false,
    },
    {
      id: "ast-4",
      name: "WKSTN-FIN-04",
      type: "Endpoints / Workstation",
      ip: "10.0.4.112",
      risk: 94.0,
      status: "Critical",
      isolated: true,
    },
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-md bg-amber-950/80 text-amber-400 border border-amber-800/80">
              <Server className="w-4 h-4" />
            </span>
            <CardTitle className="text-white font-mono">CRITICAL ENTERPRISE ASSETS AT RISK</CardTitle>
          </div>
          <Badge variant="critical">CROWN JEWEL EXPOSURE</Badge>
        </div>
        <CardDescription>
          High-value infrastructure targeted in active attack narratives with weighted blast-radius metrics.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Asset Identifier</TableHead>
              <TableHead>System Role</TableHead>
              <TableHead>Internal IP</TableHead>
              <TableHead>Risk Gauge</TableHead>
              <TableHead>Containment State</TableHead>
              <TableHead className="text-right">Mitigation</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {assets.map((asset) => (
              <TableRow key={asset.id}>
                <TableCell>
                  <div className="font-bold text-slate-200 font-mono flex items-center gap-1.5">
                    <Server className="w-3.5 h-3.5 text-blue-400" />
                    {asset.name}
                  </div>
                </TableCell>
                <TableCell className="text-slate-400">{asset.type}</TableCell>
                <TableCell className="text-slate-400 font-mono">{asset.ip}</TableCell>
                <TableCell>
                  <RiskIndicator score={asset.risk} size="sm" showLabel={false} />
                </TableCell>
                <TableCell>
                  {asset.isolated ? (
                    <Badge variant="critical">ISOLATED</Badge>
                  ) : (
                    <Badge variant="low">CONNECTED</Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  {asset.isolated ? (
                    <Button variant="outline" size="sm" disabled>
                      Quarantined
                    </Button>
                  ) : (
                    <Button
                      variant="containment"
                      size="sm"
                      onClick={() => onIsolateAsset?.(asset.name)}
                    >
                      <Lock className="w-3 h-3" />
                      Isolate
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
