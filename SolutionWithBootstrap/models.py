from google.appengine.ext import ndb

class MovieQuote(ndb.Model):
    """ A movie quote and the title of the movie from which it came """
    quote = ndb.StringProperty()
    movie = ndb.StringProperty()
    last_touch_date_time = ndb.DateTimeProperty(auto_now=True)