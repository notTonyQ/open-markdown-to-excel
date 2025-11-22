export interface AIConfig {
  endpoint: string;
  apiKey: string;
  model: string;
}

/**
 * Format unformatted text into a proper Markdown table using OpenAI API
 * @param text - Unformatted text (e.g., messy table data)
 * @param config - AI configuration (endpoint, apiKey, model)
 * @returns Formatted Markdown table string or null if failed
 */
export const formatTextToMarkdown = async (
  text: string,
  config: AIConfig
): Promise<string | null> => {
  if (!config.apiKey) {
    throw new Error('API key is required');
  }

  if (!config.endpoint) {
    throw new Error('Endpoint is required');
  }

  try {
    console.log('Formatting text with OpenAI:', { model: config.model, textLength: text.length });

    const response = await fetch(config.endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${config.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: config.model,
        messages: [
          {
            role: 'system',
            content: 'Convert the input content into CORRECT Markdown table format.\n- Retain the original language and content\n- Change/correct only the format\n- Output ONLY the complete Markdown string\n- Do not include wrappers such as code blocks or braces'
          },
          {
            role: 'user',
            content: text
          }
        ],
        temperature: 0,
        stream: false,
        max_tokens: 2000
      })
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Invalid API key');
      } else if (response.status === 404) {
        throw new Error('Invalid endpoint URL');
      } else if (response.status === 429) {
        throw new Error('Rate limit exceeded');
      }
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();

    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error('Invalid response format from API');
    }

    let content = data.choices[0].message.content;

    // Clean up possible markdown code block wrappers
    content = content.replace(/```markdown\n?/g, '').replace(/```\n?/g, '').trim();

    // Basic validation: should start with | or be empty
    if (content && !content.startsWith('|') && !content.includes('|')) {
      console.warn('Response does not look like a markdown table:', content);
    }

    return content;
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw error;
  }
};
