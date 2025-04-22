import { Confidence } from '@/components/ResultCard';

const API_URL = 'https://arittrabag-dementia-backend.hf.space';

export const analyzeMRI = async (imageFile: File): Promise<{
  predictedClass: string;
  confidences: Confidence;
  insights: string;
}> => {
  try {
    // Create form data
    const formData = new FormData();
    formData.append('file', imageFile);

    // Send request to backend
    const response = await fetch(`${API_URL}/analyze`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to analyze MRI');
    }

    const result = await response.json();

    if (result.error) {
      throw new Error(result.error);
    }

    return {
      predictedClass: result.predictedClass,
      confidences: result.confidences,
      insights: result.insights
    };
  } catch (error) {
    console.error('Error analyzing MRI:', error);
    throw error;
  }
};
