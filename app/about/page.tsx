export default function AboutPage() {
  return (
    <div className="prose max-w-none">
      <h1 className="text-4xl font-bold text-viba-gray mb-8">About Viba</h1>
      
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold text-viba-gray mb-4">Your Personal Mood-Boosting Companion</h2>
          <p className="text-viba-gray/80 leading-relaxed">
            Viba is your daily companion for maintaining and improving your mental well-being. 
            We understand that life can be challenging, and sometimes you need a little boost 
            to keep going. That's where Viba comes in.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-viba-gray mb-4">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-xl font-medium text-viba-teal mb-2">Daily Motivation</h3>
              <p className="text-viba-gray/80">
                Get personalized motivational content tailored to your needs and preferences.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-xl font-medium text-viba-teal mb-2">Mood Tracking</h3>
              <p className="text-viba-gray/80">
                Keep track of your emotional well-being and identify patterns to improve your mental health.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-viba-gray mb-4">Our Mission</h2>
          <p className="text-viba-gray/80 leading-relaxed">
            At Viba, we believe that everyone deserves to feel their best every day. 
            Our mission is to make mental wellness accessible, engaging, and effective 
            through technology and compassionate design.
          </p>
        </section>
      </div>
    </div>
  );
}
