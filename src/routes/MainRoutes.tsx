import Home from "@/pages/Home";
import { createBrowserRouter } from "react-router-dom";
import AuthRoute from "./AuthRoute";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";
import MainLayout from "@/layouts/MainLayout";
import AuthLayout from "@/layouts/AuthLayout";
import Books from "@/pages/Books";
import AddBook from "@/components/AddBook/AddBook";
import PrivateRoute from "./PrivateRoute";
import BookDetails from "@/pages/BookDetails";
import EditBook from "@/pages/EditBook";
import WishList from "@/pages/WishList";
import ReadingList from "@/pages/ReadingList";
import Contact from "@/pages/Contact";
import Checkout from "@/components/Shop/CheckOut/Checkout";
import AddToCart from "@/pages/AddToCart";
import Blog from "@/pages/Blog";
import AddBlog from "@/components/AddBlog/AddBlog";
import ErrorPage from "@/components/Error/ErrorPage";

export const AllRoutes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/",
        element: (
          <AuthRoute>
            <Home />
          </AuthRoute>
        ),
      },
      {
        path: "/books",
        element: <Books />,
      },
      {
        path: "/blogs",
        element: <Blog />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/books/:bookID",
        element: <BookDetails />,
      },
      {
        path: "/books/edit-book/:bookID",
        element: (
          <PrivateRoute>
            <EditBook />
          </PrivateRoute>
        ),
      },
      {
        path: "/add-book",
        element: (
          <PrivateRoute>
            <AddBook />
          </PrivateRoute>
        ),
      },
      {
        path: "/add-blog",
        element: (
          <PrivateRoute>
            <AddBlog />
          </PrivateRoute>
        ),
      },
      {
        path: "/wishlist",
        element: (
          <PrivateRoute>
            <WishList />
          </PrivateRoute>
        ),
      },
      {
        path: "/reading-list",
        element: (
          <PrivateRoute>
            <ReadingList />
          </PrivateRoute>
        ),
      },
      {
        path: "/cart",
        element: (
          <PrivateRoute>
            <AddToCart />
          </PrivateRoute>
        ),
      },
      {
        path: "/checkout",
        element: (
          <PrivateRoute>
            <Checkout />
          </PrivateRoute>
        ),
      },
    ],

    errorElement: (
      <div className="mt-20">
        <ErrorPage />
      </div>
    ),
  },
  {
    path: "auth",
    element: <AuthLayout />,
    children: [
      {
        path: "signin",
        element: (
          <AuthRoute>
            <SignIn />
          </AuthRoute>
        ),
      },
      {
        path: "signup",
        element: (
          <AuthRoute>
            <SignUp />
          </AuthRoute>
        ),
      },
    ],
  },
]);
