import BookCardSkeleton from "../ui/skeleton/BookCardSkeleton";

export default function BookListSkeleton() {
	return (
		<div className=" mt-20 w-full   grid grid-cols-1   sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 ">
			<BookCardSkeleton />
			<BookCardSkeleton />
			<BookCardSkeleton />
			<BookCardSkeleton />
			<BookCardSkeleton />
			<BookCardSkeleton />
			<BookCardSkeleton />
			<BookCardSkeleton />
			<BookCardSkeleton />
			<BookCardSkeleton />
		</div>
	);
}

