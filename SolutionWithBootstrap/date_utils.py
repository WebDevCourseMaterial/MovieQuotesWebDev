from datetime import timedelta, tzinfo

# The first step in learning to do time zones the "right" way is to use:
# https://code.google.com/p/gae-pytz/

class UTC(tzinfo):
    """ UTC """
    def utcoffset(self, dt):
        return timedelta(0)
    def dst(self, dt):
        return timedelta(0)
    def tzname(self, dt):
        return "UTC"

class MyTimezone(tzinfo):
    def utcoffset(self, dt):
        return timedelta(hours=-4)
    def dst(self, dt):
        # A fixed-offset class:  doesn't account for DST
        return timedelta(0)
    def tzname(self,dt):
        return "GMT-4"

def date_format(value):
    tz = MyTimezone()
    value = value.replace(tzinfo=UTC()).astimezone(tz)
    if value.year == value.now(tz).year:
        if value.month == value.now(tz).month and value.day == value.now(tz).day:
            format_str = "Today"
        elif value.year == value.now(tz).year:
            format_str = "%B %d"
        format_str += ", %I:%M%p"
    else:
        format_str = "%B %d, %Y"
    return value.strftime(format_str).replace(" 0", " ")
