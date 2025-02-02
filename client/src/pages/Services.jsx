const Services = () => {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-bold text-center mb-6">Our Services</h1>
      <ul className="space-y-4">
        <li className="bg-gray-100 p-6 rounded-md shadow-md">
          <h2 className="text-2xl font-semibold">Content Writing</h2>
          <p className="text-gray-700">
            We offer professional content writing services for blogs, websites,
            and marketing materials.
          </p>
        </li>
        <li className="bg-gray-100 p-6 rounded-md shadow-md">
          <h2 className="text-2xl font-semibold">SEO Optimization</h2>
          <p className="text-gray-700">
            Our SEO services ensure that your content ranks higher on search
            engines, increasing visibility and traffic.
          </p>
        </li>
        <li className="bg-gray-100 p-6 rounded-md shadow-md">
          <h2 className="text-2xl font-semibold">Consulting</h2>
          <p className="text-gray-700">
            We provide expert advice on content strategy, social media, and
            digital marketing to help you grow your online presence.
          </p>
        </li>
      </ul>
    </div>
  );
};

export default Services;
