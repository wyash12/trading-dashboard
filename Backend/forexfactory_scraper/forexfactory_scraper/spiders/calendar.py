import scrapy

class CalendarSpider(scrapy.Spider):
    name = "calendar"
    allowed_domains = ["forexfactory.com"]
    start_urls = ["https://www.forexfactory.com/calendar"]

    def parse(self, response):
        rows = response.css('tr.calendar__row')

        current_date = None
        current_time = None
        current_currency = None
        current_impact = None

        for row in rows:
            # Extract date
            date_text = row.css('td.calendar__date span::text').get()
            if date_text:
                current_date = date_text.strip()

            # Extract time
            time_cell = row.css('td.calendar__time')
            current_time = time_cell.css('::text').get()

            # Extract currency
            current_currency = row.css('td.calendar__currency::text').get()

            # Extract impact from the icon class
            impact_icon_class = row.css('td.calendar__impact span[class*="icon--ff-impact-"]::attr(class)').get()
            
            # Map icon classes to impact levels
            if impact_icon_class:
                if "icon--ff-impact-red" in impact_icon_class:
                    current_impact = "High"
                elif "icon--ff-impact-ora" in impact_icon_class:
                    current_impact = "Medium"
                elif "icon--ff-impact-yel" in impact_icon_class:
                    current_impact = "Low"
                else:
                    current_impact = None  # Handle unknown cases
            else:
                current_impact = None

            # Extract other fields
            event = row.css('td.calendar__event span::text').get()
            actual = row.css('td.calendar__actual span::text').get()
            forecast = row.css('td.calendar__forecast span::text').get()
            previous = row.css('td.calendar__previous span::text').get()

            if event and event.strip():
                yield {
                    'date': current_date,
                    'time': current_time.strip() if current_time else None,
                    'currency': current_currency.strip() if current_currency else None,
                    'impact': current_impact,
                    'event': event.strip(),
                    'actual': actual.strip() if actual else None,
                    'forecast': forecast.strip() if forecast else None,
                    'previous': previous.strip() if previous else None,
                }