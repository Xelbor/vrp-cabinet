import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { motion } from "framer-motion";
import { ChevronDownIcon  } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ReactNode, useState } from 'react';

interface CollapsibleProps {
  title: ReactNode,
  children: ReactNode;
}

export function CollapsibleNew({
    title,
    children
}: CollapsibleProps) {
    const [isOpen, setOpen] = useState(false);
    return (
        <Collapsible open={isOpen} onOpenChange={setOpen} className="h-full">
            <Card className="bg-zinc-900 border-zinc-800 shadow-xl rounded-2xl h-full flex flex-col justify-between">
              <CollapsibleTrigger asChild>
                <Button
                  variant="transparent"
                  className="w-full justify-start text-white text-xl rounded-none cursor-pointer"
                >
                  {title}
                  <ChevronDownIcon
                    className={`ml-auto transition-transform duration-200 ${
                      isOpen ? "rotate-0" : "rotate-90"
                    }`}
                  />
                </Button>
              </CollapsibleTrigger>
                  
              <CollapsibleContent className="p-6 text-sm text-zinc-400 flex-1 data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden text-sm text-zinc-400"
                  >
                    <div className="">
                      {children}
                    </div>
                  </motion.div>
              </CollapsibleContent>
            </Card>
          </Collapsible>
    );
}