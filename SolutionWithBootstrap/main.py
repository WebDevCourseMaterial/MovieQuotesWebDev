#!/usr/bin/env python
#
# Copyright 2007 Google Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
import logging
import os

from google.appengine.ext import ndb
import jinja2
from models import MovieQuote
import webapp2


jinja_env = jinja2.Environment(
  loader=jinja2.FileSystemLoader(os.path.dirname(__file__)),
  autoescape=True)

# Generic key used to group MovieQuotes into an entity group.
PARENT_KEY = ndb.Key("Entity", 'moviequote_root')

class MovieQuotesPage(webapp2.RequestHandler):
    def get(self):
        moviequotes_query = MovieQuote.query(ancestor=PARENT_KEY).order(-MovieQuote.last_touch_date_time)
        template = jinja_env.get_template("templates/moviequotes.html")
        self.response.out.write(template.render({"moviequotes_query": moviequotes_query}))

class InsertQuoteAction(webapp2.RequestHandler):
    def post(self):
        if self.request.get("entity_key"):
            moviequote_key = ndb.Key(urlsafe=self.request.get('entity_key'))
            moviequote = moviequote_key.get()
            moviequote.quote = self.request.get("quote")
            moviequote.movie = self.request.get("movie")
            moviequote.put()
        else:
            new_quote = MovieQuote(parent=PARENT_KEY,
                                   quote=self.request.get("quote"),
                                   movie=self.request.get("movie"))
            new_quote.put()
        self.redirect(self.request.referer)

class DeleteQuoteAction(webapp2.RequestHandler):
    def post(self):
        moviequote_key = ndb.Key(urlsafe=self.request.get('entity_key'))
        moviequote_key.delete()
        self.redirect(self.request.referer)

app = webapp2.WSGIApplication([
    ("/", MovieQuotesPage),
    ("/insertquote", InsertQuoteAction),
    ("/deletequote", DeleteQuoteAction)
], debug=True)



