function SkeletonNav(){
  return (
    <nav className="nav">
      <div className="image skeleton"></div>
      <div className="search skeleton"></div>
      <div className="return-orders skeleton"></div>
      <div className="hart skeleton"></div>
    </nav>
  )
}

function SkeletonHeroSection(){
  return (
    <section className="hero-section">
      <div className="p-1 skeleton"></div>
      <div className="p-2 skeleton"></div>
    </section>
  )
}

function SkeletonProduct(){
  return (
    <article className="product skeleton">
    </article>
  )
}

function SkeletonProductsGrid(){

  return (
    <section className="products-grid">
      <SkeletonProduct />
      <SkeletonProduct />
      <SkeletonProduct />
      <SkeletonProduct />
      <SkeletonProduct />
      <SkeletonProduct />
    </section>
  )
}

interface SkeletonLoadProps {
  displayStatus?: string;
}

export default function SkeletonLoad({displayStatus}: SkeletonLoadProps){
  return (
    <article style={{display: displayStatus}} className="loading-homepage js-loading-homepage">
      <SkeletonNav />
      <SkeletonHeroSection />
      <SkeletonProductsGrid />
    </article>
  )
}