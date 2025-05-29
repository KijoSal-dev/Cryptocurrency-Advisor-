from datetime import datetime
from crypto_data import crypto_data
import re

# format crypto recommmendation crypto format cryptocurrency information for display
def format_crypto_recommendation(crypto):
    return f"{crypto['name']} ({crypto['symbol']}) - {crypto['description']}"

#process message main function to handle user input and return appropriate responses handles greetings, help requests, sustainability queries, trending coins, market cap, long-term investment advice, and specific cryptocurrency queries
def process_message(message):
    normalized_message = message.lower()
    
    # CHATBOY:CONTAINS CHATBOT LOGIC
    # Handle greetings
    if re.match(r'^(hi|hello|hey|greetings)', normalized_message):
        return "👋 Hello! I'm CryptoBuddy, your friendly crypto advisor. Ask me about sustainable cryptocurrencies, trending coins, or investment advice!"
    
    # Handle help requests
    if any(word in normalized_message for word in ['help', 'guide', 'how to use']):
        return ("You can ask me questions like:\n"
                "- Which crypto is trending up?\n"
                "- What's the most sustainable coin?\n"
                "- Which crypto has the highest market cap?\n"
                "- What do you recommend for long-term investment?")

    # Handle sustainability queries
    if any(word in normalized_message for word in ['sustainable', 'green', 'eco-friendly', 'environment']):
        sustainable_coins = [coin for coin in crypto_data.values() if coin['sustainability_score'] >= 7]
        sustainable_coins.sort(key=lambda x: x['sustainability_score'], reverse=True)
        
        if sustainable_coins:
            top_coin = sustainable_coins[0]
            other_coins = ' and '.join(coin['name'] for coin in sustainable_coins[1:3])
            return (f"🌱 The most sustainable cryptocurrency is {top_coin['name']} ({top_coin['symbol']}) "
                   f"with a sustainability score of {top_coin['sustainability_score']}/10. "
                   f"It has {top_coin['energy_use']} energy usage and {top_coin['description']}\n\n"
                   f"Other eco-friendly options include {other_coins}.")
        
        return "I couldn't find highly sustainable cryptocurrencies in my database."

    # Handle trending/price trend queries
    if any(word in normalized_message for word in ['trending', 'rising', 'bull', 'price increase', 'growing']):
        trending_coins = [coin for coin in crypto_data.values() if coin['price_trend'] == 'rising']
        trending_coins.sort(key=lambda x: x['sustainability_score'], reverse=True)
        
        if trending_coins:
            recommendations = '\n\n'.join(format_crypto_recommendation(coin) for coin in trending_coins[:2])
            return f"📈 These cryptocurrencies are currently trending up:\n\n{recommendations}"
        
        return "I couldn't find trending cryptocurrencies in my database right now."

    # Handle market cap queries
    if any(phrase in normalized_message for phrase in ['market cap', 'largest', 'biggest', 'highest value']):
        high_cap_coins = [coin for coin in crypto_data.values() if coin['market_cap'] == 'high']
        high_cap_coins.sort(key=lambda x: x['sustainability_score'], reverse=True)
        
        if high_cap_coins:
            recommendations = '\n\n'.join(format_crypto_recommendation(coin) for coin in high_cap_coins[:2])
            return f"💰 These cryptocurrencies have the highest market capitalization:\n\n{recommendations}"
        
        return "I couldn't find high market cap cryptocurrencies in my database."

    # Handle long-term investment queries
    if any(word in normalized_message for word in ['long term', 'invest', 'future', 'stable', 'hold']):
        long_term_coins = [
            coin for coin in crypto_data.values()
            if (coin['sustainability_score'] >= 7 and coin['market_cap'] != 'low') or
               (coin['price_trend'] != 'falling' and coin['sustainability_score'] >= 6)
        ]
        long_term_coins.sort(key=lambda x: x['sustainability_score'], reverse=True)
        
        if long_term_coins:
            top_coin = long_term_coins[0]
            return (f"🔮 For long-term investment, I recommend {top_coin['name']} ({top_coin['symbol']}). "
                   f"It has a sustainability score of {top_coin['sustainability_score']}/10, "
                   f"{top_coin['market_cap']} market cap, and {top_coin['price_trend']} price trend.\n\n"
                   f"{top_coin['description']}\n\n"
                   f"Remember: Crypto investments carry risk—always do your own research!")
        
        return "Based on my current data, I don't have strong long-term investment recommendations. The market may be volatile right now."

    # Handle specific cryptocurrency queries
    for key, crypto in crypto_data.items():
        if any(name in normalized_message for name in [key, crypto['name'].lower(), crypto['symbol'].lower()]):
            return (f"💎 {crypto['name']} ({crypto['symbol']}):\n\n"
                   f"Price Trend: {crypto['price_trend']}\n"
                   f"Market Cap: {crypto['market_cap']}\n"
                   f"Energy Use: {crypto['energy_use']}\n"
                   f"Sustainability Score: {crypto['sustainability_score']}/10\n\n"
                   f"{crypto['description']}")
    
    return ("I'm not sure how to answer that question about cryptocurrencies. "
            "Try asking me about sustainable coins, trending cryptocurrencies, "
            "or specific coins like Bitcoin or Ethereum!")
# Main function to run the chatbot including chat with the bot , type exit to quit and get responses based on queries
def main():
    print("\n=== CryptoBuddy Advisor ===")
    print("Your AI assistant for sustainable crypto investments")
    print("\nType 'exit' to quit the chat")
    
    # Send welcome message
    welcome_message = ("👋 Hi there! I'm CryptoBuddy, your AI crypto advisor. "
                      "I can help you find sustainable and profitable cryptocurrencies. "
                      "Ask me about trending coins, sustainability scores, or investment advice!")
    print(f"\nCryptoBuddy: {welcome_message}")
    
    while True:
        user_input = input("\nYou: ").strip()
        
        if user_input.lower() == 'exit':
            print("\nCryptoBuddy: Thanks for chatting! Remember to always do your own research before investing. Goodbye! 👋")
            break
        
        response = process_message(user_input)
        print(f"\nCryptoBuddy: {response}")

if __name__ == "__main__":
    main()