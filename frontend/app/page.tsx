// frontend/app/page.jsx (or the appropriate file in your Next.js project)

import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import { useRouter } from 'next/router';
import { notFound } from 'next/navigation';

async function getProducts(searchQuery) {
    const allProducts = [
        { id: "1", title: "Textbook", description: "Intro to Computer Science", price: 30, image: "/frontend/components/icons/logo.png?height=200&width=200", category: "Books" },
        { id: "2", title: "Desk Lamp", description: "Adjustable LED lamp", price: 15, image: "/frontend/components/icons/logo.png?height=200&width=200", category: "Furniture" },
        { id: "3", title: "Backpack", description: "Lightly used backpack", price: 0, image: "/frontend/components/icons/logo.png?height=200&width=200", category: "Accessories" },
        // Add more products as needed
    ];

    if (!searchQuery) {
        return allProducts;
    }

    const lowerCaseQuery = searchQuery.toLowerCase();

    return allProducts.filter((product) =>
        [product.title, product.description, product.category]
            .join(" ")
            .toLowerCase()
            .includes(lowerCaseQuery)
    );
}

export default async function Home({ searchParams }) {
    const searchQuery = searchParams.query || "";
    const products = await getProducts(searchQuery);

    return (
        <div className="min-h-screen bg-gray-100">
            <Header />
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">Marketplace</h1>

                {/* Search Bar */}
                <form method="GET" className="mb-6">
                    <input
                        type="text"
                        name="query"
                        placeholder="Search products..."
                        defaultValue={searchQuery}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                        Search
                    </button>
                </form>

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.length > 0 ? (
                        products.map((product) => (
                            <ProductCard key={product.id} {...product} />
                        ))
                    ) : (
                        <p className="text-gray-700">No products found.</p>
                    )}
                </div>
            </main>
        </div>
    );
}

