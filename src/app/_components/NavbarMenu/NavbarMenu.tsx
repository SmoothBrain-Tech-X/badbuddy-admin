import {
  type Icon,
  IconBuildingCommunity,
  IconCalendarEvent,
  IconDashboard,
} from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {}

interface NavigationItem {
  label: string;
  icon: Icon;
  link: string;
  badge?: string;
}

export const navigationItems: NavigationItem[] = [
//   {
//     label: "Dashboard",
//     icon: IconDashboard,
//     link: "/dashboard",
//   },
  //   {
  //     label: 'Users',
  //     icon: IconUsers,
  //     link: '/user',
  //     badge: '2.1K',
  //   },
  {
    label: "Venues",
    icon: IconBuildingCommunity,
    link: "/venue",
  },
  {
    label: "Reservation",
    icon: IconCalendarEvent,
    link: "/reservation",
  },
  //   {
  //     label: 'Parties',
  //     icon: IconCalendarEvent,
  //     link: '/partie',
  //     badge: '156',
  //   },
];

export default function NavbarMenu(props: Props) {
  const pathname = usePathname();

  const isActive = (link: string) => {
    return pathname.startsWith(link);
  };

  return (
    <div className={``}>
      <div className="flex h-full flex-col">
        <div className="flex-1 overflow-y-auto">
          <nav className="py-2">
            {navigationItems.map((item, index) => (
              <Link href={item.link} key={index}>
                <button
                  key={index}
                  className={`flex w-full items-center justify-between px-4 py-2 ${isActive(item.link) ? "bg-blue-50" : "hover:bg-gray-50"} `}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`rounded-md p-2 ${isActive(item.link) ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600"} `}
                    >
                      <item.icon size={18} />
                    </div>
                    {item.label}
                  </div>
                </button>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
