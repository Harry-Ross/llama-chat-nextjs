"use client";

import { getServerSession } from "next-auth";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export const Navbar = () => {
	const { data: session, status } = useSession();
	console.log(session, status);

	return (
		<NavigationMenu>
			<NavigationMenuList>
				{status === "authenticated" && (
					<NavigationMenuItem>
						<Link href="/docs" legacyBehavior passHref>
							<NavigationMenuLink
								className={cn(navigationMenuTriggerStyle(), "mr-0")}
							>
								{session?.user?.image && (
									<Image
										className="mx-2 rounded-full"
										alt="Profile photo"
										width={20}
										height={20}
										src={session?.user?.image}
									/>
								)}
								{session?.user?.name}
							</NavigationMenuLink>
						</Link>
					</NavigationMenuItem>
				)}
				<NavigationMenuItem>
					<NavigationMenuTrigger>Item One</NavigationMenuTrigger>
					<NavigationMenuContent>
						<NavigationMenuLink>Link1</NavigationMenuLink>
					</NavigationMenuContent>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuTrigger>Item Two</NavigationMenuTrigger>
					<NavigationMenuContent>
						<NavigationMenuLink>Link2</NavigationMenuLink>
					</NavigationMenuContent>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	);
};
