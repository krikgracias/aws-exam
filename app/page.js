<p className="text-sm text-gray-500">out of 1000</p>
              </div>
              <div className="text-center">
                <p className="text-gray-600">Passing Score</p>
                <p className="text-5xl font-bold text-blue-600">700</p>
                <p className="text-sm text-gray-500">minimum required</p>
              </div>
            </div>
            <div className="text-center text-sm text-gray-600">
              <p>Scored Questions Correct: {results.scoredCorrect} / {results.scoredTotal} ({results.rawScore}%)</p>
              <p className="text-xs mt-1 italic">Note: 15 unscored questions were included for testing purposes</p>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center"><BookOpen className="w-6 h-6 mr-2" />Performance by Category</h2>
            <div className="space-y-3">
              {Object.entries(results.categoryPerformance).map(([category, stats]) => {
                const percentage = (stats.correct / stats.total) * 100;
                const isWeak = percentage < 70;
                return (
                  <div key={category} className={`p-4 rounded-lg ${isWeak ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'}`}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold">{category}</span>
                      <span className={`font-bold ${isWeak ? 'text-red-600' : 'text-green-600'}`}>{stats.correct} / {stats.total} ({percentage.toFixed(1)}%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className={`h-2 rounded-full ${isWeak ? 'bg-red-500' : 'bg-green-500'}`} style={{width: `${percentage}%`}}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {results.weakAreas.length > 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4 text-yellow-800">📚 Study Guide - Focus Areas</h2>
              <p className="mb-4 text-gray-700">Based on your performance, you should focus on these areas:</p>
              <ul className="space-y-3">
                {results.weakAreas.map((area) => (
                  <li key={area.category} className="bg-white p-4 rounded border border-yellow-300">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-bold text-lg text-yellow-900">{area.category}</span>
                      <span className="text-red-600 font-semibold">{area.percentage}%</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">Score: {area.correct}/{area.total} questions correct</p>
                    <div className="text-sm text-gray-700">
                      {area.category === 'Cloud Concepts' && (
                        <div>
                          <p className="font-semibold mb-1">Focus on:</p>
                          <ul className="list-disc ml-5 space-y-1">
                            <li>Six advantages of cloud computing</li>
                            <li>Cloud deployment models (Public, Private, Hybrid)</li>
                            <li>Cloud service models (IaaS, PaaS, SaaS)</li>
                            <li>AWS Well-Architected Framework pillars</li>
                            <li>Elasticity vs Scalability concepts</li>
                          </ul>
                        </div>
                      )}
                      {area.category === 'Security' && (
                        <div>
                          <p className="font-semibold mb-1">Focus on:</p>
                          <ul className="list-disc ml-5 space-y-1">
                            <li>AWS Shared Responsibility Model</li>
                            <li>IAM Users, Groups, Roles, and Policies</li>
                            <li>Security Groups vs NACLs</li>
                            <li>AWS KMS, CloudTrail, Config, GuardDuty</li>
                            <li>Root user best practices</li>
                          </ul>
                        </div>
                      )}
                      {area.category === 'Technology' && (
                        <div>
                          <p className="font-semibold mb-1">Focus on:</p>
                          <ul className="list-disc ml-5 space-y-1">
                            <li>Core AWS services: EC2, S3, RDS, Lambda, VPC</li>
                            <li>Database services: RDS, DynamoDB, Redshift, Aurora</li>
                            <li>Networking: VPC, Subnets, NAT Gateway, Route 53</li>
                            <li>Storage: S3, EBS, EFS, Glacier</li>
                            <li>Monitoring: CloudWatch, CloudTrail</li>
                          </ul>
                        </div>
                      )}
                      {area.category === 'Billing and Pricing' && (
                        <div>
                          <p className="font-semibold mb-1">Focus on:</p>
                          <ul className="list-disc ml-5 space-y-1">
                            <li>AWS pricing models: On-Demand, Reserved, Spot, Savings Plans</li>
                            <li>Cost management tools: Cost Explorer, Budgets, Trusted Advisor</li>
                            <li>Support plans: Basic, Developer, Business, Enterprise</li>
                            <li>Consolidated Billing in AWS Organizations</li>
                            <li>Free Tier offerings</li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-6 p-4 bg-blue-50 rounded border border-blue-200">
                <p className="font-semibold text-blue-900 mb-2">📖 Recommended Study Resources:</p>
                <ul className="text-sm space-y-1 text-blue-800">
                  <li>• AWS Cloud Practitioner Essentials (free digital course)</li>
                  <li>• AWS Whitepapers: Overview of Amazon Web Services</li>
                  <li>• AWS Well-Architected Framework documentation</li>
                  <li>• AWS Pricing Calculator and Cost Management documentation</li>
                  <li>• Practice with AWS Free Tier hands-on labs</li>
                </ul>
              </div>
            </div>
          )}

          {results.passed && results.weakAreas.length === 0 && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
              <p className="text-lg text-green-800 font-semibold">Excellent performance across all categories! You are well-prepared for the actual exam! 🎯</p>
            </div>
          )}

          <button onClick={() => window.location.reload()} className="w-full mt-6 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition">
            Take Another Practice Exam
          </button>
        </div>
      </div>
    );
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const q = questions[currentQuestion];
  const answeredCount = Object.keys(answers).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-800">AWS Cloud Practitioner Mock Exam</h1>
            <div className="text-right">
              <p className={`text-2xl font-bold ${timeRemaining < 600 ? 'text-red-600' : 'text-blue-600'}`}>{formatTime(timeRemaining)}</p>
              <p className="text-sm text-gray-500">Time Remaining</p>
            </div>
          </div>
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span>Answered: {answeredCount} / {questions.length}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full transition-all duration-300" style={{width: `${progress}%`}}></div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-4">
          <div className="mb-6">
            <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold mb-4">{q.cat}</span>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">{q.text}</h2>
          </div>

          <div className="space-y-3">
            {q.opts.map((option, index) => (
              <button key={index} onClick={() => handleAnswer(index)} className={`w-full text-left p-4 rounded-lg border-2 transition-all ${answers[currentQuestion] === index ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'}`}>
                <div className="flex items-center">
                  <span className={`w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center ${answers[currentQuestion] === index ? 'border-blue-500 bg-blue-500' : 'border-gray-300'}`}>
                    {answers[currentQuestion] === index && <CheckCircle className="w-4 h-4 text-white" />}
                  </span>
                  <span className="flex-1">{option}</span>
                </div>
              </button>
            ))}
          </div>

          {answers[currentQuestion] !== undefined && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-800"><strong>Hint:</strong> {q.hint}</p>
            </div>
          )}
        </div>

        <div className="flex justify-between">
          <button onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))} disabled={currentQuestion === 0} className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-400 transition">
            ← Previous
          </button>
          
          {currentQuestion < questions.length - 1 ? (
            <button onClick={() => setCurrentQuestion(currentQuestion + 1)} className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">
              Next →
            </button>
          ) : (
            <button onClick={handleSubmit} className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition">
              Submit Exam
            </button>
          )}
        </div>
      </div>
    </div>
  );
}