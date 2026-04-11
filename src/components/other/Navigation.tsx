"use client"
import { menuItems } from "@/utils/constants"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

const Navigation = () => {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <ul className="w-full p-4 max-lg:min-h-screen max-lg:flex max-lg:flex-col max-lg:justify-center">
      {menuItems.map(({ title, path }: { title: string, path: string }) => {

        if (path === "") {
          return (
            <li
              key={title}
              className="max-lg:text-center max-lg:text-2xl my-2 p-2 rounded-md cursor-pointer hover:bg-primary hover:text-white"
              onClick={() => router.push("/dashboard")}
            >
              {title}
            </li>
          )
        }

        return (
          <li
            key={title}
            className={`max-lg:text-center max-lg:text-2xl my-2 p-2 rounded-md cursor-pointer
              hover:bg-primary hover:text-white 
              ${pathname === path ? "bg-primary text-white" : ""}`}
          >
            <Link href={path}>{title}</Link>
          </li>
        )
      })}
    </ul>
  )
}

export default Navigation